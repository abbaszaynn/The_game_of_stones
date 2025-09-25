export interface MineLocation {
  name: string;
  polygon: { lat: number; lng: number }[];
}

export interface Document {
  id: string;
  title: string;
  type: 'Geological Report' | 'License' | 'Concession Paper' | 'Financial Summary';
  url: string;
  companyId: string;
}

export interface Video {
  id: string;
  url: string;
  title: string;
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  description: string;
  history: string;
  leadership: { name: string; title: string }[];
  projects: { name: string; status: string }[];
  investorContacts: { name: string; email: string; phone: string }[];
  locations: MineLocation[];
  images: string[];
  videos: Video[];
  virtualTourUrl: string;
  documents: Document[];
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  companyId?: string;
}
