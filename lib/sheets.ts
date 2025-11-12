import Papa from 'papaparse';
import { Installation } from './types';

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const SHEET_GID = process.env.NEXT_PUBLIC_SHEET_GID || '0';
const PRIVACY_OFFSET = Number(process.env.NEXT_PUBLIC_PRIVACY_OFFSET) || 500;

// Helper to add random offset to coordinates for privacy
function addPrivacyOffset(lat: number, lng: number, offsetMeters: number): { lat: number; lng: number } {
  // Convert meters to degrees (approximate)
  const offsetDegrees = offsetMeters / 111000; // 1 degree ≈ 111km
  
  // Random angle
  const angle = Math.random() * 2 * Math.PI;
  
  // Random distance within offset
  const distance = Math.random() * offsetDegrees;
  
  const latOffset = distance * Math.cos(angle);
  const lngOffset = distance * Math.sin(angle) / Math.cos(lat * Math.PI / 180);
  
  return {
    lat: lat + latOffset,
    lng: lng + lngOffset
  };
}

export async function fetchInstallations(): Promise<Installation[]> {
  if (!SHEET_ID) {
    throw new Error('NEXT_PUBLIC_SHEET_ID not configured');
  }

  // Google Sheets CSV export URL
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
  
  // State normalization map
  const stateMap: { [key: string]: string } = {
    'MA': 'Massachusetts',
    'CT': 'Connecticut',
    'RI': 'Rhode Island',
    'NH': 'New Hampshire'
  };

  try {
    const response = await fetch(csvUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const installations: Installation[] = [];

            results.data.forEach((row: any) => {
              // Filter: only include rows with ENTERINSSUB value (column AN)
              if (!row['ENTERINSSUB'] || row['ENTERINSSUB'].trim() === '') {
                return;
              }

              const lat = parseFloat(row['Latitud']);
              const lng = parseFloat(row['Longitud']);

              // Skip if coordinates are invalid
              if (isNaN(lat) || isNaN(lng)) {
                return;
              }

              // Add privacy offset
              const { lat: displayLat, lng: displayLng } = addPrivacyOffset(lat, lng, PRIVACY_OFFSET);
              
              // Normalize state name
              const rawState = row['State'] || '';
              const normalizedState = stateMap[rawState] || rawState;

              installations.push({
                address: row['Street Address'] || '',
                city: row['City'] || '',
                state: normalizedState,
                latitude: lat,
                longitude: lng,
                displayLat,
                displayLng
              });
            });

            resolve(installations);
          } catch (error: unknown) {
            reject(error);
          }
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error: unknown) {
    console.error('Error fetching installations:', error);
    throw error;
  }
}

export function getUniqueStates(installations: Installation[]): string[] {
  const stateMap: { [key: string]: string } = {
    'MA': 'Massachusetts',
    'CT': 'Connecticut',
    'RI': 'Rhode Island',
    'NH': 'New Hampshire'
  };
  
  const states = new Set(
    installations
      .map(i => i.state)
      .filter(Boolean)
      .map(state => stateMap[state] || state)
  );
  
  return Array.from(states).sort();
}

export function getUniqueCities(installations: Installation[], state?: string): string[] {
  let filtered = installations;
  
  if (state && state !== 'all') {
    filtered = installations.filter(i => i.state === state);
  }
  
  const cities = new Set(filtered.map(i => i.city).filter(Boolean));
  return Array.from(cities).sort();
}
