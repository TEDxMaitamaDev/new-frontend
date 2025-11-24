import apiConfig from './config';

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
}

export async function subscribeNewsletter(email: string): Promise<NewsletterSubscribeResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/newsletter/subscribe`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ email }),
    });

    const result: NewsletterSubscribeResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to subscribe to newsletter');
    }
    
    return result;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

