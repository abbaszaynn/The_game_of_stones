
import type { Company, NewsArticle, Document } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find((img) => img.id === id)?.imageUrl || '';

const documents: Document[] = [
  { id: 'doc-1', companyId: 'durr-mines-and-minerals', title: 'Copper Ore at Skardu,  Tehsil Gultari', type: 'Geological Report', url: 'https://mega.nz/file/gIZRxJZY#iumoVJkKeejUdux1fQz-Y31o0lAMDcMhJ3X-KnDNyL0' },
  { id: 'doc-7', companyId: 'durr-mines-and-minerals', title: 'Marble Ore at Bagicha', type: 'Geological Report', url: 'https://mega.nz/file/4UhxmTKY#AzFv7Jc3IE11OhBKdGSbaRYKM85UhmtwrOKc96f9vcI' },
  { id: 'doc-2', companyId: 'durr-mines-and-minerals', title: 'MINING LICENSE', type: 'License', url: '#' },
  { id: 'doc-3', companyId: 'earth-lux-mines', title: 'Jutial Nala Prospectus', type: 'Geological Report', url: '#' },
  { id: 'doc-4', companyId: 'earth-lux-mines', title: 'Annual Financial Summary 2023', type: 'Financial Summary', url: '#' },
  { id: 'doc-5', companyId: 'himalayan-minerals', title: 'Kargah Nala Concession Paper', type: 'Concession Paper', url: '#' },
  { id: 'doc-6', companyId: 'himalayan-minerals', title: 'Environmental Impact Assessment', type: 'Geological Report', url: '#' },
];

const companies: Company[] = [
  {
    id: 'durr-mines-and-minerals',
    name: 'Durr Mines and Minerals',
    tagline: 'Precision in Extraction, Excellence in Delivery.',
    description: 'DURR MINE & MINERALS (PRIVATE) LIMITED is a private limited company based in Gilgit, Gilgit-Baltistan, Pakistan, formally incorporated under the Companies Act, 2017. The company was established to focus on a broad spectrum of mining and minerals operations, setting a foundation for growth in the region\'s natural resources sector.',
    history: 'Founded by Tabish Hassan and Daniyal Ali, DURR MINE & MINERALS (PRIVATE) LIMITED was officially incorporated in June 2025, marking a new chapter in the exploration and development of mineral assets in northern Pakistan. From the outset, the company set its registered office in Mohallah Khomer Yarkote, Gilgit, a region known for its mineral richness and strategic significance.',
    leadership: [
      { name: 'Tabish Hassan', title: 'CEO & Founder' },
      { name: 'Daniyal Ali', title: 'Director' },
    ],
    projects: [{ name: 'Skardu Topaz Project', status: 'Operational' }],
    investorContacts: [{ name: 'Investor Relations Dept.', email: 'invest@durrmines.com', phone: '+1-202-555-0175' }],
    locations: [
      {
        name: 'Bagicha Marble Mine',
        polygon: [
          { lat: 35.606778, lng: 75.374582 },
          { lat: 35.611378, lng: 75.356035 },
          { lat: 35.603268, lng: 75.343413 },
          { lat: 35.558972, lng: 75.346333 },
          { lat: 35.556753, lng: 75.397472 },
          { lat: 35.570902, lng: 75.398565 },
          { lat: 35.575398, lng: 75.383905 },
          { lat: 35.599013, lng: 75.373735 },
        ],
      },
       {
        name: 'Gultari Copper Mine',
        polygon: [
          { lat: 34.746706, lng: 75.630010 },
          { lat: 34.740339, lng: 75.644094 },
          { lat: 34.721708, lng: 75.661562 },
          { lat: 34.701370, lng: 75.671159 },
          { lat: 34.698445, lng: 75.686172 },
          { lat: 34.692636, lng: 75.694130 },
          { lat: 34.683967, lng: 75.685651 },
          { lat: 34.689811, lng: 75.657918 },
          { lat: 34.692394, lng: 75.611105 },
          { lat: 34.704402, lng: 75.607838 },
          { lat: 34.703439, lng: 75.646978 },
          { lat: 34.737789, lng: 75.629405 },
          { lat: 34.744648, lng: 75.624278 },
        ],
      },
    ],
    images: [
        'https://i.postimg.cc/Bt1LhVfj/IMG-20250921-WA0003.jpg',
        'https://i.postimg.cc/wyntqhLK/IMG-20250921-WA0004.jpg',
        'https://i.postimg.cc/K4gk9HhF/IMG-20250921-WA0005.jpg',
        'https://i.postimg.cc/DJRWvqLT/IMG-20250921-WA0006.jpg',
        'https://i.postimg.cc/9zqRxnH2/IMG-20250921-WA0007.jpg',
        'https://i.postimg.cc/ZWJW5YBy/IMG-20250921-WA0008.jpg',
        'https://i.postimg.cc/MnznpZMZ/IMG-20250921-WA0010.jpg',
        'https://i.postimg.cc/1fhgbryM/IMG-20250921-WA0011.jpg',
        'https://i.postimg.cc/LJmJ84Yg/IMG-20250921-WA0012.jpg',
        'https://i.postimg.cc/G4b4m38z/IMG-20250921-WA0013.jpg',
        'https://i.postimg.cc/68zy2snb/IMG-20250921-WA0014.jpg',
        'https://i.postimg.cc/w1F7yKDp/IMG-20250921-WA0015.jpg',
        'https://i.postimg.cc/GB29vMjb/IMG-20250921-WA0016.jpg',
        'https://i.postimg.cc/cKH6fDcS/IMG-20250921-WA0017.jpg'
    ],
    videos: [{id: 'vid-1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Drone Flyover of Skardu Site'}],
    virtualTourUrl: 'https://earth.google.com/web/@35.586,-75.367,2712a,15000d,35y,0h,0t,0r',
    documents: documents.filter(d => d.companyId === 'durr-mines-and-minerals'),
  },
  {
    id: 'earth-lux-mines',
    name: 'Earth Lux Mines',
    tagline: 'Unearthing the Planet\'s Hidden Treasures.',
    logoUrl: findImage('logo-lux'),
    description: 'Earth Lux Mines focuses on the ethical sourcing of precious metals and gemstones. Our operations in the Gilgit region are renowned for their efficiency and community engagement, ensuring shared prosperity.',
    history: 'Established in 2012, Earth Lux Mines quickly identified and secured promising sites in Jutial Nala. We pride ourselves on a modern approach to mining that respects local heritage and ecosystems.',
    leadership: [
      { name: 'Bilal Ahmed', title: 'Managing Director' },
      { name: 'Sana Javed', title: 'Head of Operations' },
    ],
    projects: [{ name: 'Jutial Nala Gold Vein', status: 'Exploratory Phase' }],
    investorContacts: [{ name: 'Public Relations', email: 'pr@earthlux.com', phone: '+1-202-555-0182' }],
    locations: [
       {
        name: 'Jutial Nala, Gilgit',
        polygon: [
          { lat: 35.90578, lng: 74.35305 },
          { lat: 35.90750, lng: 74.34940 },
          { lat: 35.90900, lng: 74.34800 },
          { lat: 35.90800, lng: 74.35500 },
          { lat: 35.90600, lng: 74.35700 },
          { lat: 35.90578, lng: 74.35305 }
        ],
      },
    ],
    images: [findImage('gallery-lux-1'), findImage('gallery-lux-2')],
    videos: [{id: 'vid-2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Community Projects in Gilgit'}],
    virtualTourUrl: 'https://earth.google.com/web/@35.907,-74.352,2465a,2000d,35y,0h,0t,0r',
    documents: documents.filter(d => d.companyId === 'earth-lux-mines'),
  },
  {
    id: 'himalayan-minerals',
    name: 'Himalayan Minerals',
    tagline: 'Strength from the Mountains.',
    logoUrl: findImage('logo-himalayan'),
    description: 'Himalayan Minerals is dedicated to extracting industrial minerals from one of the world\'s most formidable mountain ranges. Our expertise in high-altitude operations is unmatched.',
    history: 'Our operations began in 2008, with a focus on the rich mineral deposits around Kargah Nala. Himalayan Minerals has pioneered new techniques for safe and effective mining in challenging terrains.',
    leadership: [
      { name: 'Zoya Ali', title: 'Chairperson' },
      { name: 'Usman Beg', title: 'Chief Engineer' },
    ],
    projects: [{ name: 'Kargah Nala Industrial Minerals', status: 'Operational' }],
    investorContacts: [{ name: 'Shareholder Services', email: 'shares@himalayanmin.com', phone: '+1-202-555-0199' }],
    locations: [
      {
        name: 'Kargah Nala, Gilgit',
        polygon: [
          { lat: 35.92083, lng: 74.30833 },
          { lat: 35.92300, lng: 74.30500 },
          { lat: 35.92450, lng: 74.31000 },
          { lat: 35.92200, lng: 74.31250 },
          { lat: 35.92083, lng: 74.30833 }
        ],
      },
    ],
    images: [findImage('gallery-himalayan-1'), findImage('gallery-himalayan-2')],
    videos: [{id: 'vid-3', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'High-Altitude Operations'}],
    virtualTourUrl: 'https://earth.google.com/web/@35.922,-74.309,2400a,2000d,35y,0h,0t,0r',
    documents: documents.filter(d => d.companyId === 'himalayan-minerals'),
  },
];


const news: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Global Commodity Markets See Upward Trend',
    excerpt: 'Analysts predict a strong quarter for mineral commodities, driven by increased demand in the tech and manufacturing sectors. Mining stocks are responding positively.',
    content: 'Detailed analysis shows that the demand for rare earth minerals and copper has surged. Companies with established extraction operations, like Durr Mines and Minerals, are well-positioned to capitalize on this trend. Investors are watching closely as market dynamics unfold.',
    imageUrl: findImage('news-1'),
    publishDate: '2024-05-15T10:00:00Z',
  },
  {
    id: 'news-2',
    companyId: 'earth-lux-mines',
    title: 'Earth Lux Mines Announces New Green Technology Initiative',
    excerpt: 'In a move towards greater sustainability, Earth Lux Mines has partnered with leading tech firms to implement a new water recycling system at its Gilgit operations.',
    content: 'The new system is expected to reduce water consumption by 40% and will be fully operational by Q4 2024. "This is a major step in our commitment to responsible mining," said Managing Director Bilal Ahmed. The initiative has been praised by environmental groups.',
    imageUrl: findImage('news-2'),
    publishDate: '2024-05-10T14:30:00Z',
  },
  {
    id: 'news-3',
    companyId: 'himalayan-minerals',
    title: 'Himalayan Minerals Expands Operations at Kargah Nala',
    excerpt: 'Following a successful exploratory phase, Himalayan Minerals is set to expand its industrial mineral extraction, projecting a 25% increase in output.',
    content: 'The expansion involves the deployment of new, state-of-the-art drilling equipment designed for high-altitude performance. Chairperson Zoya Ali stated that the expansion will create new jobs and boost the local economy while adhering to strict safety protocols.',
    imageUrl: findImage('news-3'),
    publishDate: '2024-05-01T09:00:00Z',
  },
];

export async function getCompanies(): Promise<Company[]> {
  return companies.map(company => ({
    ...company,
    logoUrl: company.logoUrl || findImage('logo-durr'),
  }));
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  const company = companies.find((company) => company.id === id);
  if (company) {
    // Ensure the logo is always present, using a placeholder if needed.
    if (!company.logoUrl) {
      company.logoUrl = findImage('logo-durr'); // Default placeholder
    }
  }
  return company;
}


export async function getNews(): Promise<NewsArticle[]> {
  return news.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getDocuments(): Promise<Document[]> {
    const allDocsWithCompanyName = documents.map(doc => {
        const company = companies.find(c => c.id.startsWith(doc.companyId));
        return {
            ...doc,
            companyName: company ? company.name : 'Unknown'
        }
    });
    return allDocsWithCompanyName;
}

    
    
