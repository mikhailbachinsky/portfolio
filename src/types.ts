export interface ColorItem {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  rgb: string;
  cmyk: string;
  role: string;
  rationale: string;
}

export interface MerchItem {
  id: string;
  title: string;
  category: string;
  colorHex: string;
  colorName: string;
  description: string;
}

export interface SocialPostItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  description: string;
}
