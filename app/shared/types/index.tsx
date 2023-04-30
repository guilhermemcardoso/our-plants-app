export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  bio: string;
  score: {
    xp: number;
    level: number;
    xp_next_level: number;
  };
  completed_profile: boolean;
  updated_at: string;
  created_at: string;
  profile_image: string;
  mapped_plants: number;
  address: {
    street_name: string;
    neighbourhood: string;
    zip_code: string;
    house_number: string;
    city: string;
    state_or_province: string;
    country: string;
  };
}
