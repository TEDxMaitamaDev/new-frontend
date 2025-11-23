import apiConfig from './config';

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  start_time: string | null;
  event_date: string | null;
  event_category: string | null;
  location: string;
  image: string;
  date_created: string | null;
  is_past?: boolean;
  is_upcoming?: boolean;
}

export interface EventsApiResponse {
  success: boolean;
  data: EventResponse[];
  message?: string;
}

export interface EventApiResponse {
  success: boolean;
  data: EventResponse;
  message?: string;
}

export async function getAllEvents(): Promise<EventResponse[]> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/events/get-all`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const result: EventsApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch events');
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEventById(id: number): Promise<EventResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/events/get-one/${id}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    const result: EventApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch event');
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

