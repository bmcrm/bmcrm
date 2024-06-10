export type History = { year: number; text: string };

export interface ICamper {
  id: string;
  camp_id: string;
  email: string;
  city: string;
  camp_name: string;
  first_name: string;
  last_name: string;
  playa_name: string;
  camp_website: string;
  avatar?: string;
  summary?: string;
  history?: History[];
}
