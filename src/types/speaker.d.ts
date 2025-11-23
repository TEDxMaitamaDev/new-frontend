export type Speaker = {
  id: number;
  name: string;
  portfolio: string;
  profile: string;
  photo: string;
  date_created: string | null;
  event_id?: number | null;
  // Frontend display fields (derived from backend data)
  image?: string;
  role?: string;
  anchored_topic?: string;
  biography?: string;
  event_title?: string;
  event_year?: number;
};
