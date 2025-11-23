export interface BlogPost {
  id: number;
  title: string;
  photo: string;
  content: string;
  author: string;
  date_created: string | null;
  // Frontend display fields
  category?: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

