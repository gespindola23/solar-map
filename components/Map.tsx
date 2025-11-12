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
      // Create custom marker element - Golden dark style
      const el = document.createElement('div');
      el.className = 'ecoloop-marker';
      el.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFB800" class="marker-glow"/>
          <circle cx="12" cy="12" r="6" fill="#FFEB3B" opacity="0.9"/>
        </svg>
      `;

      // Create popup - Dark mode style
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'ecoloop-popup'
      }).setHTML(`
        <div class="px-4 py-3 bg-gray-900 text-white">
          <div class="font-semibold text-base">${installation.city}, ${installation.state}</div>
          <div class="text-sm text-gray-400 mt-1">Solar Installation</div>
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
          filter: drop-shadow(0 0 8px rgba(255, 184, 0, 0.6));
        }
        
        .ecoloop-marker:hover {
          transform: scale(1.2);
          z-index: 1;
          filter: drop-shadow(0 0 16px rgba(255, 235, 59, 0.9));
        }
        
        .marker-glow {
          animation: goldpulse 2s ease-in-out infinite;
        }
        
        @keyframes goldpulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 4px rgba(255, 235, 59, 0.8));
          }
        }
        
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 184, 0, 0.2);
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
