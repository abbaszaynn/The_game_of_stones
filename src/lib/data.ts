
import type { Company, NewsArticle, Document, GalleryImage, Deposit } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find((img) => img.id === id)?.imageUrl || '';

const documents: Document[] = [
  { id: 'doc-1', companyId: 'durr-mines-and-minerals', title: 'Copper Ore at Skardu,  Tehsil Gultari', type: 'Geological Report', url: 'https://mega.nz/file/gIZRxJZY#iumoVJkKeejUdux1fQz-Y31o0lAMDcMhJ3X-KnDNyL0' },
  { id: 'doc-7', companyId: 'durr-mines-and-minerals', title: 'Marble Ore at Bagicha', type: 'Geological Report', url: 'https://mega.nz/file/4UhxmTKY#AzFv7Jc3IE11OhBKdGSbaRYKM85UhmtwrOKc96f9vcI' },
  { id: 'doc-2', companyId: 'durr-mines-and-minerals', title: 'MINING LICENSE', type: 'License', url: '#' },
  { id: 'doc-8', companyId: 'earth-lux-mines', title: 'Incorporation Letter', type: 'License', url: 'https://mega.nz/file/NAY3GaQZ#igzi5X3SNFZkZAGjLZ-a5rWd-qcfVyL65Ks1zcPeyQQ' },
  { id: 'doc-9', companyId: 'earth-lux-mines', title: 'Geological Report - Gupis, Ghizer', type: 'Geological Report', url: 'https://mega.nz/file/BQhDEIJL#JXvUAfDZsxfiWlTOWGHEP64WQWvArnKuwEseFZX6UBU' },
  { id: 'doc-4', companyId: 'earth-lux-mines', title: 'Annual Financial Summary 2023', type: 'Financial Summary', url: '#' },
  { id: 'doc-5', companyId: 'himalayan-minerals', title: 'Kargah Nala Concession Paper', type: 'Concession Paper', url: '#' },
  { id: 'doc-6', companyId: 'himalayan-minerals', title: 'Environmental Impact Assessment', type: 'Geological Report', url: '#' },
];

const galleryImages: GalleryImage[] = [
    { id: 'gal-1', url: 'https://i.postimg.cc/wyntqhLK/IMG-20250921-WA0004.jpg', title: 'Raw Amethyst Geode', description: 'A stunning, vibrant purple amethyst geode formation.', companyName: 'Durr Mines and Minerals', mineral: 'Amethyst', properties: 'Quartz variety, known for its violet color.' },
    { id: 'gal-2', url: 'https://i.postimg.cc/K4gk9HhF/IMG-20250921-WA0005.jpg', title: 'Rough Azurite Mineral', description: 'Deep blue azurite crystals on a rock matrix.', companyName: 'Durr Mines and Minerals', mineral: 'Azurite', properties: 'A soft, deep-blue copper mineral.' },
    { id: 'gal-3', url: 'https://i.postimg.cc/DJRWvqLT/IMG-20250921-WA0006.jpg', title: 'Crystalline Bismuth', description: 'Iridescent, staircase-like bismuth crystals.', companyName: 'Durr Mines and Minerals', mineral: 'Bismuth', properties: 'Brittle metal with a silvery-white color and an iridescent oxide tarnish.' },
    { id: 'gal-4', url: 'https://i.postimg.cc/9zqRxnH2/IMG-20250921-WA0007.jpg', title: 'Pyrite Cluster', description: 'A dense cluster of metallic golden pyrite crystals.', companyName: 'Durr Mines and Minerals', mineral: 'Pyrite', properties: 'Iron sulfide mineral, also known as "Fool\'s Gold".' },
    { id: 'gal-5', url: 'https://i.postimg.cc/ZWJW5YBy/IMG-20250921-WA0008.jpg', title: 'Polished Malachite', description: 'A polished slice of malachite with intricate banding.', companyName: 'Durr Mines and Minerals', mineral: 'Malachite', properties: 'A green copper carbonate hydroxide mineral.' },
    { id: 'gal-6', url: 'https://i.postimg.cc/MnznpZMZ/IMG-20250921-WA0010.jpg', title: 'Rose Quartz', description: 'A large, translucent piece of raw rose quartz.', companyName: 'Durr Mines and Minerals', mineral: 'Rose Quartz', properties: 'A variety of quartz with a pale pink to rose red hue.' },
    { id: 'gal-7', url: 'https://i.postimg.cc/1fhgbryM/IMG-20250921-WA0011.jpg', title: 'Tourmaline Crystals', description: 'Black tourmaline crystals embedded in a quartz matrix.', companyName: 'Durr Mines and Minerals', mineral: 'Tourmaline', properties: 'A crystalline boron silicate mineral.' },
    { id: 'gal-8', url: 'https://i.postimg.cc/LJmJ84Yg/IMG-20250921-WA0012.jpg', title: 'Labradorite Slab', description: 'A slab of labradorite showing its characteristic labradorescence.', companyName: 'Durr Mines and Minerals', mineral: 'Labradorite', properties: 'Feldspar mineral known for its iridescent optical effect.' },
    { id: 'gal-9', url: 'https://i.postimg.cc/G4b4m38z/IMG-20250921-WA0013.jpg', title: 'Raw Fluorite Octahedron', description: 'A natural, unpolished fluorite crystal with an octahedron shape.', companyName: 'Durr Mines and Minerals', mineral: 'Fluorite', properties: 'A halide mineral composed of calcium fluoride.' },
    { id: 'gal-10', url: 'https://i.postimg.cc/68zy2snb/IMG-20250921-WA0014.jpg', title: 'Chrysocolla Specimen', description: 'A vibrant blue and green chrysocolla mineral specimen.', companyName: 'Durr Mines and Minerals', mineral: 'Chrysocolla', properties: 'A hydrated copper phyllosilicate mineral.' },
    { id: 'gal-11', url: 'https://i.postimg.cc/w1F7yKDp/IMG-20250921-WA0015.jpg', title: 'Citrine Crystal', description: 'A yellow citrine quartz crystal.', companyName: 'Durr Mines and Minerals', mineral: 'Citrine', properties: 'A variety of quartz whose color ranges from a pale yellow to brown.' },
    { id: 'gal-12', url: 'https://i.postimg.cc/GB29vMjb/IMG-20250921-WA0016.jpg', title: 'Opal', description: 'A colorful precious opal.', companyName: 'Durr Mines and Minerals', mineral: 'Opal' },
    { id: 'gal-13', url: 'https://i.postimg.cc/cKH6fDcS/IMG-20250921-WA0017.jpg', title: 'Garnet', description: 'A red garnet crystal.', companyName: 'Durr Mines and Minerals', mineral: 'Garnet' },
    { id: 'gal-14', url: 'https://images.unsplash.com/photo-1598585461494-0a619861e8a3?q=80&w=2070&auto=format&fit=crop', title: 'Agate', description: 'A slice of agate with beautiful banding.', companyName: 'Durr Mines and Minerals', mineral: 'Agate' }
];

const durrDeposits: Deposit[] = [
    {
        name: "Marble Deposits (Bagicha, Skardu)",
        location: "Bagicha, District Skardu, Gilgit-Baltistan",
        type: "Extensive Marble body with significant quartz-rich zones and block/vein formations.",
        details: [
            "Sheets/Blocks: 1–4 feet thick; strike length 200–350 meters in various exposures.",
            "Strike Continuity: Exposures and blocks observed continuously along strike lengths of 1 to 5 kilometers."
        ]
    },
    {
        name: "Copper & Polymetallic Deposits (Gultari, Skardu)",
        location: "Gultari, Tehsil Gultari, District Skardu, Gilgit-Baltistan",
        type: "Copper ore in polymetallic settings, with iron and silica quartz.",
        details: [
            "Exposed as mineralized veins; thicknesses from 1–5 feet and visually mapped along strike lengths of 200–350 meters at different locations.",
            "Veins and deposits traceable for 3 to 5 kilometers."
        ]
    }
];

const earthLuxDeposits: Deposit[] = [
    {
        name: "Jutial Nala Deposits",
        location: "Jutial Nala, Gilgit",
        type: "Polymetallic structures.",
        details: [
            "Area: 10 sq km.",
            "Primary Minerals: Copper, Iron, Silver, Lead.",
            "Trace Minerals: Antimony."
        ]
    },
    {
        name: "Opposite Gupis Mine Deposits",
        location: "Gupis, Tehsil Yasin, District Ghizer",
        type: "Copper deposits.",
        details: [
            "Area spans 10 Sq/Km (2,471 Acres)."
        ]
    }
];

const companies: Omit<Company, 'images'> & { images: (string | GalleryImage)[] }[] = [
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
    projects: [{ name: 'Skardu Topaz Project' }],
    status: 'Operational',
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
    images: galleryImages.filter(img => img.companyName === 'Durr Mines and Minerals'),
    videos: [{id: 'vid-1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Drone Flyover of Skardu Site'}],
    virtualTourUrl: 'https://earth.google.com/web/@35.586,-75.367,2712a,15000d,35y,0h,0t,0r',
    documents: documents.filter(d => d.companyId === 'durr-mines-and-minerals'),
    deposits: durrDeposits,
  },
  {
    id: 'earth-lux-mines',
    name: 'Earth Lux Mines & Minerals (Pvt) Ltd.',
    tagline: 'Unearthing the Planet\'s Hidden Treasures.',
    logoUrl: findImage('logo-lux'),
    description: 'Earth Lux Mines & Minerals (Pvt) Ltd. is a mining company committed to the exploration, extraction, and processing of high-quality minerals and metals. Established in 2023, our company has built a strong reputation for innovation, sustainability, and operational excellence in the mining industry. With a presence in key mineral-rich regions, we leverage cutting-edge technology and industry best practices to ensure efficient and responsible mining operations. Our expertise lies in extracting ore and supplying vital raw ore to industries across the globe. In order to maximize resource efficiency and maintain the highest safety and environmental standards, our skilled team of geologists, engineers, and environmental specialists works tirelessly.',
    history: 'The company wants to start mining in the area, which will benefit the locals\' social standing and infrastructure development while also generating income for the Gilgit-Baltistan government in the form of royalties. For the first three years of its E/L validity period, the company also plans to invest an additional Rs. 43.0 million in the relevant heads of expenditures for the mining and development of this potential, which is already described in the enclosed budget proposals as a risk capital investment.',
    leadership: [
      { name: 'Tabish Hassan', title: 'CEO' },
      { name: 'Wajid Khan', title: 'Director' },
      { name: 'Sabi-ud-din', title: 'Director' },
      { name: 'Saqlain Alam', title: 'Director' },
    ],
    projects: [
      { name: 'Jutial Nala, Gilgit' },
      { name: 'Gupis, Ghizer' },
    ],
    status: 'Operational',
    investorContacts: [{ name: 'Public Relations', email: 'pr@earthlux.com', phone: '+1-202-555-0182' }],
    locations: [
      {
        name: 'Jutial Nala, Gilgit (10 sq km)',
        polygon: [
          { lat: 35.856249, lng: 74.294070 },
          { lat: 35.882175, lng: 74.27519 },
          { lat: 35.875314, lng: 74.321451 },
          { lat: 35.865186, lng: 74.354147 },
          { lat: 35.860098, lng: 74.328441 },
          { lat: 35.849004, lng: 74.316212 },
        ],
      },
      {
        name: 'Gupis, Ghizer (10 sq km)',
        polygon: [
          { lat: 36.264768, lng: 73.461140 },
          { lat: 36.254223, lng: 73.495540 },
          { lat: 36.244428, lng: 73.466853 },
          { lat: 36.233142, lng: 73.459915 },
          { lat: 36.246712, lng: 73.423405 },
        ],
      },
    ],
    images: [findImage('gallery-lux-1'), findImage('gallery-lux-2')],
    videos: [{id: 'vid-2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Community Projects in Gilgit'}],
    virtualTourUrl: 'https://earth.google.com/web/@35.907,-74.352,2465a,2000d,35y,0h,0t,0r',
    documents: documents.filter(d => d.companyId === 'earth-lux-mines'),
    deposits: earthLuxDeposits,
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
    projects: [{ name: 'Kargah Nala Industrial Minerals' }],
    status: 'Operational',
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
    deposits: [],
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
    content: 'The new system is expected to reduce water consumption by 40% and will be fully operational by Q4 2024. "This is a major step in our commitment to responsible mining," said CEO Tabish Hassan. The initiative has been praised by environmental groups.',
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

function processCompanyImages(company: Omit<Company, 'images'> & { images: (string | GalleryImage)[] }): Company {
    const processedImages = company.images.map(img => {
        if (typeof img === 'string') {
            // It's a URL string, try to find a match in galleryImages
            const matchedImage = galleryImages.find(gImg => gImg.url === img);
            if (matchedImage) return matchedImage;
            
            // Or if it's a placeholder ID
            const placeholderUrl = findImage(img);
            if (placeholderUrl) {
                 const matchedImageFromPlaceholder = galleryImages.find(gImg => gImg.url === placeholderUrl);
                 if(matchedImageFromPlaceholder) return matchedImageFromPlaceholder;
            }

            // If no match, create a basic GalleryImage object
            return {
                id: `img-${Math.random()}`,
                url: img,
                title: 'Company Image',
                description: `An image from ${company.name}`,
                companyName: company.name,
            };
        }
        return img; // It's already a GalleryImage object
    });

    return { ...company, images: processedImages };
}


export async function getCompanies(): Promise<Company[]> {
    return companies.map(processCompanyImages).map(company => ({
        ...company,
        logoUrl: company.logoUrl || findImage('logo-durr'),
    }));
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  const companyData = companies.find((company) => company.id === id);
  if (companyData) {
    const processedCompany = processCompanyImages(companyData);
    if (!processedCompany.logoUrl) {
      processedCompany.logoUrl = findImage('logo-durr'); // Default placeholder
    }
    return processedCompany;
  }
  return undefined;
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
