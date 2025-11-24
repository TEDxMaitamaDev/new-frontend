import type { Speaker } from './speaker';

export type EventType = {
  id: number;
  title: string;
  description: string;
  start_time: string | null;
  end_time?: string | null;
  event_date?: string | null;
  event_category?: string | null;
  location: string;
  image: string;
  date_created: string | null;
  is_past?: boolean;
  is_upcoming?: boolean;
  // Frontend display fields
  date?: string;
  regLink?: string;
  speakers?: Speaker[];
};
