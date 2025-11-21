'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Installation, FilterState } from '@/lib/types';
import { fetchInstallations, getUniqueStates, getUniqueCities } from '@/lib/sheets';
import Filters from '@/components/Filters';

// Dynamically import Map to avoid SSR issues with Mapbox
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    state: 'all',
    city: 'all'
  });

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchInstallations();
        setInstallations(data);
      } catch (err) {
        console.error('Error loading installations:', err);
        setError('Failed to load installation data. Please check your configuration.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Get unique states
  const states = useMemo(() => getUniqueStates(installations), [installations]);

  // Get cities based on selected state
  const cities = useMemo(() => 
    getUniqueCities(installations, filters.state),
    [installations, filters.state]
  );

  // Filter installations
  const filteredInstallations = useMemo(() => {
    let filtered = installations;

    if (filters.state !== 'all') {
      filtered = filtered.filter(i => i.state === filters.state);
    }

    if (filters.city !== 'all') {
      filtered = filtered.filter(i => i.city === filters.city);
    }

    return filtered;
  }, [installations, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white font-medium">Loading installations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-center max-w-md p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-3">Configuration Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen bg-gray-950">
      <Filters
        states={states}
        cities={cities}
        filters={filters}
        onFilterChange={setFilters}
      />

      <Map installations={filteredInstallations} />
    </main>
  );
}
