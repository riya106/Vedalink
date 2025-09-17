export interface StoreState {
  producers: Producer[];
  getProducers: () => Promise<void>;
}

export interface Crop {
  id: number;
  name: string;
  variety: string;
  quantity: number;
  unit: string;
  plantedAt: string;     // DateTime → string (ISO format in API JSON)
  harvestedAt?: string;  // nullable
  farmerId: number;
  createdAt: string;
  updatedAt: string;

  // Relations
  // If you plan to include these in API responses, define them too
  // orders: Order[];
  // inventory: Inventory[];
}

export interface Producer {
  id: number;
  name: string;
  email: string;
  phone: string;
  farmName: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  clerkId: string;
  acreage: string;
  batches: number;
  bio: string;
  certifications: string[];
  gallery: string[];
  image: string;
  lastHarvest: string;
  methods: string[];
  rating: number;
  region: string;
  since: number;
}