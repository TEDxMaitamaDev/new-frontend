export type EventType = {
  id: number;
  title: string;
  description: string;
  start_time: string | null;
  end_time: string | null;
  location: string;
  image: string;
  date_created: string | null;
  // Frontend display fields
  date?: string;
  regLink?: string;
  speakers?: Speaker[];
};
