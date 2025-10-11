
import type { Company, NewsArticle, Document, GalleryImage } from '@/lib/types';
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

const galleryImages: GalleryImage[] = [
    { id: 'gal-1', url: 'https://images.unsplash.com/photo-1588152763435-0de3c7bf35f6?q=80&w=1974&auto=format&fit=crop', title: 'Raw Amethyst Geode', description: 'A stunning, vibrant purple amethyst geode formation.', companyName: 'Durr Mines and Minerals', mineral: 'Amethyst', properties: 'Quartz variety, known for its violet color.' },
    { id: 'gal-2', url: 'https://images.unsplash.com/photo-1617393439972-8501a2434a93?q=80&w=1964&auto=format&fit=crop', title: 'Rough Azurite Mineral', description: 'Deep blue azurite crystals on a rock matrix.', companyName: 'Durr Mines and Minerals', mineral: 'Azurite', properties: 'A soft, deep-blue copper mineral.' },
    { id: 'gal-3', url: 'https://images.unsplash.com/photo-1620188460115-d72b07f8a964?q=80&w=1974&auto=format&fit=crop', title: 'Crystalline Bismuth', description: 'Iridescent, staircase-like bismuth crystals.', companyName: 'Durr Mines and Minerals', mineral: 'Bismuth', properties: 'Brittle metal with a silvery-white color and an iridescent oxide tarnish.' },
    { id: 'gal-4', url: 'https://images.unsplash.com/photo-1590422157596-f6c6a666f272?q=80&w=1974&auto=format&fit=crop', title: 'Pyrite Cluster', description: 'A dense cluster of metallic golden pyrite crystals.', companyName: 'Durr Mines and Minerals', mineral: 'Pyrite', properties: 'Iron sulfide mineral, also known as "Fool\'s Gold".' },
    { id: 'gal-5', url: 'https://images.unsplash.com/photo-1620188526398-9e579934e23c?q=80&w=1974&auto=format&fit=crop', title: 'Polished Malachite', description: 'A polished slice of malachite with intricate banding.', companyName: 'Durr Mines and Minerals', mineral: 'Malachite', properties: 'A green copper carbonate hydroxide mineral.' },
    { id: 'gal-6', url: 'https://images.unsplash.com/photo-1604187351543-03e583489851?q=80&w=1974&auto=format&fit=crop', title: 'Rose Quartz', description: 'A large, translucent piece of raw rose quartz.', companyName: 'Durr Mines and Minerals', mineral: 'Rose Quartz', properties: 'A variety of quartz with a pale pink to rose red hue.' },
    { id: 'gal-7', url: 'https://images.unsplash.com/photo-1589935447047-bf37b37f3747?q=80&w=1974&auto=format&fit=crop', title: 'Tourmaline Crystals', description: 'Black tourmaline crystals embedded in a quartz matrix.', companyName: 'Durr Mines and Minerals', mineral: 'Tourmaline', properties: 'A crystalline boron silicate mineral.' },
    { id: 'gal-8', url: 'https://images.unsplash.com/photo-1616450639910-3c22b97f9c2d?q=80&w=1974&auto=format&fit=crop', title: 'Labradorite Slab', description: 'A slab of labradorite showing its characteristic labradorescence.', companyName: 'Durr Mines and Minerals', mineral: 'Labradorite', properties: 'Feldspar mineral known for its iridescent optical effect.' },
    { id: 'gal-9', url: 'https://images.unsplash.com/photo-1629814467368-a4e320ab1621?q=80&w=1968&auto=format&fit=crop', title: 'Raw Fluorite Octahedron', description: 'A natural, unpolished fluorite crystal with an octahedron shape.', companyName: 'Durr Mines and Minerals', mineral: 'Fluorite', properties: 'A halide mineral composed of calcium fluoride.' },
    { id: 'gal-10', url: 'https://images.unsplash.com/photo-1588152755160-4f964a2c14c5?q=80&w=1974&auto=format&fit=crop', title: 'Chrysocolla Specimen', description: 'A vibrant blue and green chrysocolla mineral specimen.', companyName: 'Durr Mines and Minerals', mineral: 'Chrysocolla', properties: 'A hydrated copper phyllosilicate mineral.' },
    { id: 'gal-11', url: 'https://images.unsplash.com/photo-1525542813454-b336369e8557?q=80&w=1974&auto=format&fit=crop', title: 'Citrine Crystal', description: 'A yellow citrine quartz crystal.', companyName: 'Durr Mines and Minerals', mineral: 'Citrine', properties: 'A variety of quartz whose color ranges from a pale yellow to brown.' },
    { id: 'gal-12', url: 'https://images.unsplash.com/photo-1615147321523-a5539c362058?q=80&w=2070&auto=format&fit=crop', title: 'Opal', description: 'A colorful precious opal.', companyName: 'Durr Mines and Minerals', mineral: 'Opal' },
    { id: 'gal-13', url: 'https://images.unsplash.com/photo-1610486036899-7901b0f5854b?q=80&w=1974&auto=format&fit=crop', title: 'Garnet', description: 'A red garnet crystal.', companyName: 'Durr Mines and Minerals', mineral: 'Garnet' },
    { id: 'gal-14', url: 'https://images.unsplash.com/photo-1598585461494-0a619861e8a3?q=80&w=2070&auto=format&fit=crop', title: 'Agate', description: 'A slice of agate with beautiful banding.', companyName: 'Durr Mines and Minerals', mineral: 'Agate' }
];

const companies: Company[] = [
  {
    id: 'durr-mines-and-minerals',
    name: 'Durr Mines and Minerals',
    tagline: 'Precision in Extraction, Excellence in Delivery.',
    description: 'DURR MINE & MINERALS (PRIVATE) LIMITED is a private limited company based in Gilgit, Gilgit-Baltistan, Pakistan, formally incorporated under the Companies Act, 2017. The company was established to focus on a broad spectrum of mining and minerals operations, setting a foundation for growth in the region\'s natural resources sector.',
    history: 'Founded by Tabish Hassan and Daniyal Ali, DURR MINE & MINERALS (PRIVATE) LIMITED was officially incorporated in June 2025, marking a new chapter in the exploration and development of mineral assets in northern Pakistan. From the outset, the company set its registered office in Mohallah Khomer Yarkote, Gilgit, a region known for its mineral richness and strategic significance.',
    logoUrl: 'https://i.postimg.cc/Bt1LhVfj/IMG-20250921-WA0003.jpg',
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
        'https://images.unsplash.com/photo-1588152763435-0de3c7bf35f6?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617393439972-8501a2434a93?q=80&w=1964&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620188460115-d72b07f8a964?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590422157596-f6c6a666f272?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620188526398-9e579934e23c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604187351543-03e583489851?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589935447047-bf37b37f3747?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616450639910-3c22b97f9c2d?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629814467368-a4e320ab1621?q=80&w=1968&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1588152755160-4f964a2c14c5?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525542813454-b336369e8557?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1615147321523-a5539c362058?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1610486036899-7901b0f5854b?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598585461494-0a619861e8a3?q=80&w=2070&auto=format&fit=crop'
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

export async function getGalleryImages(): Promise<GalleryImage[]> {
    return galleryImages;
}
