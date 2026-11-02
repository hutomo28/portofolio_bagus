export type ProjectCategory =
  | 'Music Video'
  | 'Short Drama'
  | 'Music Video Cover'
  | 'Dance Cover'
  | 'Dance Cover / Concert';

export type ProjectSource = 'youtube' | 'instagram';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  source: ProjectSource;
  url: string;
  videoId: string;
  featured?: boolean;
  featuredSize?: 'large' | 'medium' | 'small';
  role?: string;
}
