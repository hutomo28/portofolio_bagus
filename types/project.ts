export type ProjectCategory =
  | 'Music Video'
  | 'Short Drama'
  | 'Music Video Cover'
  | 'Dance Cover'
  | 'Dance Cover / Concert'
  | 'Parodi';

export type ProjectSource = 'youtube' | 'instagram';

export type ProductionHouse = 'EUIS.STUDIO' | 'EFKA.PROD';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  productionHouse: ProductionHouse;
  source: ProjectSource;
  url: string;
  videoId: string;
  featured?: boolean;
  featuredSize?: 'large' | 'medium' | 'small';
  role?: string;
}
