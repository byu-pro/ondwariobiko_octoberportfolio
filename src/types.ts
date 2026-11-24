export interface FullWidthProject {
  id: string;
  title: string;
  category: string;
  image: string;
  mobileImage?: string;
  logoImage?: string;
  websiteUrl?: string;
}

export type PageRoute = 'work' | 'about' | 'contact' | 'consultation' | 'project';
