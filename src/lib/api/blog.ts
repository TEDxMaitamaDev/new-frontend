import apiConfig from './config';

export interface BlogPostResponse {
  id: number;
  title: string;
  photo: string;
  content: string;
  author: string;
  category?: string | null;
  category_id?: number | null;
  tags?: string[];
  views?: number;
  likes?: number;
  date_created: string | null;
}

export interface BlogPostsApiResponse {
  success: boolean;
  data: BlogPostResponse[];
  message?: string;
}

export interface BlogPostApiResponse {
  success: boolean;
  data: BlogPostResponse;
  message?: string;
}

export async function getAllBlogPosts(): Promise<BlogPostResponse[]> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/blog/get-all`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const result: BlogPostsApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch blog posts');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPostById(id: number): Promise<BlogPostResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/blog/get-one/${id}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.statusText}`);
    }

    const result: BlogPostApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch blog post');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export async function incrementBlogViews(id: number): Promise<void> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/blog/increment-views/${id}`, {
      method: 'POST',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to increment views: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to increment views');
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    // Don't throw - views increment is not critical
  }
}

export interface IncrementLikesResponse {
  success: boolean;
  message: string;
  likes: number;
}

export async function incrementBlogLikes(id: number): Promise<IncrementLikesResponse> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/blog/increment-likes/${id}`, {
      method: 'POST',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to increment likes: ${response.statusText}`);
    }

    const result: IncrementLikesResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to increment likes');
    }
    
    return result;
  } catch (error) {
    console.error('Error incrementing likes:', error);
    throw error;
  }
}

export interface BlogCategoryResponse {
  id: number;
  name: string;
  description: string | null;
  date_created: string | null;
}

export interface BlogCategoriesApiResponse {
  success: boolean;
  data: BlogCategoryResponse[];
  message?: string;
}

export async function getAllBlogCategories(): Promise<BlogCategoryResponse[]> {
  try {
    const response = await fetch(`${apiConfig.baseURL}/public/blog-categories/get-all`, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog categories: ${response.statusText}`);
    }

    const result: BlogCategoriesApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch blog categories');
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
}

