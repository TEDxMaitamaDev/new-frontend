import apiConfig from './config';

export interface TeamMemberResponse {
  team_id: number;
  first_name: string;
  last_name: string;
  sex: string;
  email: string;
  member_type: string;
  portfolio: string | null;
  photo: string;
  created_by?: number;
  date_created?: string | null;
}

export interface TeamMembersApiResponse {
  success: boolean;
  data: TeamMemberResponse[];
  message?: string;
}

export async function getAllTeamMembers(): Promise<TeamMemberResponse[]> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/team/get-all`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.statusText}`);
    }

    const result: TeamMembersApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch team members');
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
}

