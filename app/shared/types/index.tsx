export interface Address {
  street_name?: string;
  neighbourhood?: string;
  zip_code?: string;
  house_number?: string;
  city?: string;
  state_or_province?: string;
  country?: string;
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  bio?: string;
  score: {
    xp: number;
    level: number;
    xp_next_level: number;
  };
  completed_profile: boolean;
  updated_at: string;
  created_at: string;
  profile_image?: string | undefined;
  mapped_plants?: number;
  address?: Address;
}

export interface Specie {
  _id: string;
  popular_name: string;
  scientific_name: string;
  created_by: string;
  deleted: boolean;
  editable: boolean;
  updated_at: string;
  created_at: string;
}

export interface Location {
  coordinates: number[];
  type: string;
}

export interface Plant {
  _id: string;
  description: string;
  location: Location;
  images: string[];
  created_by: User;
  upvotes: string[];
  downvotes: string[];
  specie_id: Specie;
  reported: boolean;
  deleted: boolean;
  editable: boolean;
  updated_at: string;
  created_at: string;
}

export interface Favorite {
  _id: string;
  user_id: string;
  plants: Plant[];
  updated_at: string;
  created_at: string;
}

export interface Complaint {
  _id: string;
  description: string;
  reason: string;
  plant_id: Plant;
  created_by: User;
  evaluated_by?: User;
  evaluation?: string;
  was_helpful?: boolean;
  deleted: boolean;
  closed: boolean;
  plants: Plant[];
  updated_at: string;
  created_at: string;
}
