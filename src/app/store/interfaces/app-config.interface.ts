export interface Theme {
  id: number;
  name: string;
  createdAt: string;
}

export interface AppConfig {
  id: number;
  businessId: string;
  logo: string;
  font: string;
  fontSize: number;
  imageCarousel: string[];
  createdAt: string;
  updatedAt: string;
  themeId: number;
  theme: Theme;
  brand?: string;
}
