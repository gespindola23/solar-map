'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Installation } from '@/lib/types';

interface MapProps {
  installations: Installation[];
}

export default function Map({ installations }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error('Mapbox token not configured');
      return;
    }

    mapboxgl.accessToken = token;

    // Center on MA/CT/RI region
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-71.8, 41.8],
      zoom: 7.5,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when installations change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove old source and layer if they exist
    if (map.current.getLayer('installations')) {
      map.current.removeLayer('installations');
    }
    if (map.current.getSource('installations')) {
      map.current.removeSource('installations');
    }

    // Create GeoJSON from installations
    const geojsonData = {
      type: 'FeatureCollection',
      features: installations.map(installation => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [installation.displayLng, installation.displayLat]
        },
        properties: {
          city: installation.city,
          state: installation.state
        }
      }))
    };

    // Add source
    map.current.addSource('installations', {
      type: 'geojson',
      data: geojsonData as any
    });

    // Add circle layer
    map.current.addLayer({
      id: 'installations',
      type: 'circle',
      source: 'installations',
      paint: {
        'circle-radius': 8,
        'circle-color': '#00CED1',
        'circle-opacity': 0.9,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#5DFDCB',
        'circle-stroke-opacity': 0.8
      }
    });

    // Add hover effect
    map.current.on('mouseenter', 'installations', () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'installations', () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
    });

    // Add click popup
    map.current.on('click', 'installations', (e) => {
      if (!e.features || !e.features[0]) return;
      
      const coordinates = (e.features[0].geometry as any).coordinates.slice();
      const { city, state } = e.features[0].properties as any;

      new mapboxgl.Popup({ offset: 15 })
        .setLngLat(coordinates)
        .setHTML(`
          <div class="px-3 py-2 bg-gray-900 text-white">
            <div class="font-medium text-sm">${city}, ${state}</div>
            <div class="text-xs text-gray-400 mt-0.5">Solar Installation</div>
          </div>
        `)
        .addTo(map.current!);
    });

    // Fit bounds to show all markers if there are any
    if (installations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      installations.forEach(installation => {
        bounds.extend([installation.displayLng, installation.displayLat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 320, right: 100 },
        maxZoom: 11,
        duration: 1000
      });
    }
  }, [installations, mapLoaded]);

  return (
    <>
      <style jsx global>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          background: #1a1a1a !important;
        }
        
        .mapboxgl-popup-tip {
          border-top-color: #1a1a1a !important;
        }
      `}</style>
      <div ref={mapContainer} className="w-full h-full" />
    </>
  );
}
