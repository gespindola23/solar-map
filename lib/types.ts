export interface Installation {
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  // Coordinates with privacy offset applied
  displayLat: number;
  displayLng: number;
}

export interface FilterState {
  state: string;
  city: string;
}
