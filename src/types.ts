export interface TravelDetails {
  destination: string;
  startDate: string;
  endDate: string;
  weather: 'hot' | 'mild' | 'cold';
  activities: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
}

export interface SavedChecklist {
  id: string;
  travelDetails: TravelDetails;
  items: PackingItem[];
  createdAt: string;
}