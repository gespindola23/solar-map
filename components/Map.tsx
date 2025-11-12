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
  const markersRef = useRef<mapboxgl.Marker[]>([]);
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

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    installations.forEach((installation) => {
      // Create custom marker element - Simple and performant
      const el = document.createElement('div');
      el.className = 'pin-marker';
      el.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="5" fill="#FDB813" opacity="0.9"/>
          <circle cx="10" cy="10" r="3" fill="#FFEB3B"/>
        </svg>
      `;

      // Create popup - Simple dark style
      const popup = new mapboxgl.Popup({
        offset: 20,
        closeButton: false,
        className: 'simple-popup'
      }).setHTML(`
        <div class="px-3 py-2 bg-gray-900 text-white">
          <div class="font-medium text-sm">${installation.city}, ${installation.state}</div>
          <div class="text-xs text-gray-400 mt-0.5">Solar Installation</div>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([installation.displayLng, installation.displayLat])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
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
        .pin-marker {
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        
        .pin-marker:hover {
          transform: scale(1.3);
        }
        
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
