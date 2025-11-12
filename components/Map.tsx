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
      style: 'mapbox://styles/mapbox/light-v11',
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
      // Create custom marker element - Ecoloop green style
      const el = document.createElement('div');
      el.className = 'ecoloop-marker';
      el.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#00B27A" class="marker-bg" opacity="0.2"/>
          <circle cx="12" cy="12" r="8" fill="#00B27A" class="marker-pulse"/>
          <path d="M12 3v2m0 14v2M3 12h2m14 0h2m-4.22-6.78l1.42 1.42M6.34 17.66l1.42 1.42m0-12.56L6.34 6.34m11.32 11.32l1.42 1.42M12 8a4 4 0 100 8 4 4 0 000-8z" 
                stroke="white" 
                stroke-width="1.8" 
                stroke-linecap="round"/>
        </svg>
      `;

      // Create popup - Ecoloop style
      const popup = new mapboxgl.Popup({
        offset: 28,
        closeButton: false,
        className: 'ecoloop-popup'
      }).setHTML(`
        <div class="px-4 py-3">
          <div class="font-semibold text-ecoloop-navy text-base">${installation.city}, ${installation.state}</div>
          <div class="text-sm text-gray-500 mt-1">Solar Installation</div>
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
        .ecoloop-marker {
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .ecoloop-marker:hover {
          transform: scale(1.15);
          z-index: 1;
        }
        
        .marker-pulse {
          animation: ecopulse 2.5s ease-in-out infinite;
        }
        
        @keyframes ecopulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 178, 122, 0.15);
          border: 1px solid rgba(0, 178, 122, 0.1);
        }
        
        .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
      <div ref={mapContainer} className="w-full h-full" />
    </>
  );
}
