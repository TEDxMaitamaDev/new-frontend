import apiConfig from './config';

export interface SpeakerResponse {
  id: number;
  name: string;
  portfolio: string;
  profile: string;
  photo: string;
  date_created: string | null;
  event_id?: number | null;
}

export interface SpeakersApiResponse {
  success: boolean;
  data: SpeakerResponse[];
  message?: string;
}

export interface SpeakerApiResponse {
  success: boolean;
  data: SpeakerResponse;
  message?: string;
}

export async function getAllSpeakers(): Promise<SpeakerResponse[]> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/speakers/get-all`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch speakers: ${response.statusText}`);
    }

    const result: SpeakersApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch speakers');
  } catch (error) {
    console.error('Error fetching speakers:', error);
    throw error;
  }
}

export async function getSpeakerById(id: number): Promise<SpeakerResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/speakers/get-one/${id}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch speaker: ${response.statusText}`);
    }

    const result: SpeakerApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch speaker');
  } catch (error) {
    console.error('Error fetching speaker:', error);
    throw error;
  }
}

