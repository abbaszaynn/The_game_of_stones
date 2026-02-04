import type { Company } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { galleryImages } from '@/lib/gallery-images-data';

export const companies: Company[] = [
  {
    id: 'durr-mines-and-minerals',
    name: 'Durr Mines and Minerals',
    tagline: 'Unearthing the Future, Responsibly.',
    logoUrl: 'https://i.postimg.cc/Qd9XpC3X/durr-logo.png', // Keep existing or update if provided
    description: 'Durr Mines and Minerals is a leading exploration and development company incorporated under the Securities and Exchange Commission of Pakistan. We are focused on critical and precious metals including Copper, Marble, and Gold in the mineral-rich Gilgit-Baltistan region. With a commitment to sustainable practices and community engagement, we are at the forefront of unlocking the mineral wealth of Pakistan.',
    history: 'Durr Mines & Minerals (Private) Limited was incorporated on the 13th of June, 2025, under the Companies Act, 2017 (Corporate Unique ID: 0297552). Since our inception, we have secured multiple mining leases in key strategic locations. Our journey began with a vision to modernize mining in Northern Pakistan, leveraging local expertise and adhering to international safety and environmental standards. We have rapidly expanded our portfolio to include Copper Ore at Skardu, Marble Ore at Bagicha, and Placer Gold deposits.',
    leadership: [
      { name: 'Tabish Hassan', title: 'Chief Executive Officer (CEO)' },
      { name: 'Daniyal Hassan', title: 'Director' },
    ],
    projects: [
      { name: 'Durr Mine & Minerals Copper Mine (Gultari)' },
      { name: 'Bagicha Marble Mine' },
      { name: 'Mahdi Abad Kharmang' },
      { name: 'Placer Gold Skardu' },
    ],
    status: 'Operational',
    investorContacts: [
      { name: 'Tabish Hassan', email: 'tabish@durrmines.com', phone: '+92-300-1234567' },
    ],
    locations: [
      {
        name: 'Durr Copper Mine (Gultari)',
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
        name: 'Mahdi Abad Kharmang',
        polygon: [
          { lat: 35.132248, lng: 75.93232 },
          { lat: 35.083869, lng: 75.966824 },
          { lat: 35.092, lng: 75.980235 },
          { lat: 35.098453, lng: 75.979636 },
          { lat: 35.135057, lng: 75.950661 },
          { lat: 35.132248, lng: 75.93232 },
        ],
      },
      {
        name: 'Placer Gold Skardu',
        polygon: [
          { lat: 35.680232, lng: 75.260285 },
          { lat: 35.679916, lng: 75.262345 },
          { lat: 35.678936, lng: 75.263429 },
          { lat: 35.67772, lng: 75.264904 },
          { lat: 35.67752, lng: 75.265746 },
          { lat: 35.677711, lng: 75.266245 },
          { lat: 35.676456, lng: 75.267168 },
          { lat: 35.676178, lng: 75.267919 },
          { lat: 35.67538, lng: 75.268847 },
          { lat: 35.675389, lng: 75.269727 },
          { lat: 35.673005, lng: 75.270537 },
          { lat: 35.665258, lng: 75.282011 },
          { lat: 35.664291, lng: 75.283298 },
          { lat: 35.664265, lng: 75.284425 },
          { lat: 35.661806, lng: 75.286206 },
          { lat: 35.660978, lng: 75.287848 },
          { lat: 35.656846, lng: 75.289897 },
          { lat: 35.656454, lng: 75.290809 },
          { lat: 35.654153, lng: 75.292815 },
          { lat: 35.651572, lng: 75.292847 },
          { lat: 35.649183, lng: 75.292772 },
          { lat: 35.648181, lng: 75.293931 },
          { lat: 35.646699, lng: 75.295658 },
          { lat: 35.64744, lng: 75.29657 },
          { lat: 35.645652, lng: 75.298491 },
          { lat: 35.645609, lng: 75.299746 },
          { lat: 35.64342, lng: 75.303608 },
          { lat: 35.639846, lng: 75.308683 },
          { lat: 35.635833, lng: 75.311982 },
          { lat: 35.631268, lng: 75.313028 },
          { lat: 35.628739, lng: 75.314112 },
          { lat: 35.627021, lng: 75.314916 },
          { lat: 35.624873, lng: 75.317953 },
          { lat: 35.623786, lng: 75.318339 },
          { lat: 35.622098, lng: 75.320753 },
          { lat: 35.621505, lng: 75.320705 },
          { lat: 35.619204, lng: 75.31762 },
          { lat: 35.615186, lng: 75.318344 },
          { lat: 35.613882, lng: 75.318135 },
          { lat: 35.612709, lng: 75.318779 },
          { lat: 35.610902, lng: 75.318578 },
          { lat: 35.60927, lng: 75.316247 },
          { lat: 35.60601, lng: 75.315195 },
          { lat: 35.60606, lng: 75.311633 },
          { lat: 35.60055, lng: 75.310056 },
          { lat: 35.600512, lng: 75.311698 },
          { lat: 35.605331, lng: 75.312181 },
          { lat: 35.605662, lng: 75.315936 },
          { lat: 35.60957, lng: 75.317395 },
          { lat: 35.611105, lng: 75.319369 },
          { lat: 35.615759, lng: 75.319047 },
          { lat: 35.619129, lng: 75.318751 },
          { lat: 35.621955, lng: 75.32203 },
          { lat: 35.62792, lng: 75.315142 },
          { lat: 35.636584, lng: 75.31247 },
          { lat: 35.64213, lng: 75.307589 },
          { lat: 35.642181, lng: 75.305765 },
          { lat: 35.645598, lng: 75.300808 },
          { lat: 35.646193, lng: 75.298394 },
          { lat: 35.646672, lng: 75.298222 },
          { lat: 35.64778, lng: 75.296345 },
          { lat: 35.647204, lng: 75.29539 },
          { lat: 35.654303, lng: 75.293148 },
          { lat: 35.658921, lng: 75.289596 },
          { lat: 35.661243, lng: 75.288191 },
          { lat: 35.664852, lng: 75.284328 },
          { lat: 35.675848, lng: 75.269963 },
          { lat: 35.678088, lng: 75.266272 },
          { lat: 35.681081, lng: 75.261412 },
          { lat: 35.681987, lng: 75.258815 },
          { lat: 35.680232, lng: 75.260285 },
        ],
      },
    ],
    images: galleryImages.filter(img => img.companyName === 'Durr Mines and Minerals'),
    videos: [
      { id: 'vid-1', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'Drone Flyover of Skardu Site' },
      { id: 'vid-2', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'Community Water Project Launch' }
    ],
    virtualTourUrl: '#',
    documents: [],
    deposits: [
      { name: 'Copper', location: 'Skardu', type: 'Copper Ore', details: ['20 Sq/Km - 4,942 Acres Applied Area', 'High-grade copper potential'] },
      { name: 'Marble', location: 'Bagicha, Skardu', type: 'Marble Ore', details: ['20 Sq/Km Applied Area', 'Premium Marble deposits'] },
      { name: 'Placer Gold', location: 'Skardu', type: 'Placer Gold', details: ['Extensive riverbed deposits', 'Gold panning operations'] }
    ]
  },
  {
    id: 'earth-lux-mines',
    name: 'Earth Lux Mines & Minerals (Pvt) Ltd.',
    tagline: 'Sustainable Mining for a Brighter Future',
    logoUrl: PlaceHolderImages.find(p => p.id === 'logo-lux')?.imageUrl || 'https://placehold.co/128x128',
    description: 'Earth Lux Mines & Minerals is dedicated to the ethical and environmentally conscious exploration of Pakistan\'s rich mineral resources. We specialize in identifying and developing high-value deposits while ensuring minimal ecological impact and maximum benefit for local communities.',
    history: 'Incorporated in 2023, Earth Lux Mines is a new-generation mining company with a fresh approach. Our foundational project in Gupis, Ghizer, was selected for its high copper potential and the opportunity to implement modern, sustainable mining techniques from the ground up. We are committed to transparency and building lasting partnerships with all stakeholders.',
    leadership: [
      { name: 'Mr. Muhammad Iqbal', title: 'Founder & Chief Geologist' },
      { name: 'Ms. Ayesha Khan', title: 'Director, Environmental & Social Governance' },
    ],
    projects: [
      { name: 'Gupis Copper Project' },
    ],
    status: 'Exploratory Phase',
    investorContacts: [
      { name: 'Corporate Office', email: 'contact@earthlux.com', phone: '+92-322-9876543' }
    ],
    locations: [
      { name: 'Gupis Exploration Area', polygon: [{ lat: 36.26, lng: 73.46 }, { lat: 36.25, lng: 73.49 }, { lat: 36.24, lng: 73.46 }, { lat: 36.24, lng: 73.42 }, { lat: 36.26, lng: 73.46 }] }
    ],
    images: galleryImages.filter(img => img.companyName === 'Earth Lux Mines'),
    videos: [
      { id: 'vid-3', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'Gupis Project: A New Frontier' }
    ],
    virtualTourUrl: '#',
    documents: [],
    deposits: [
      { name: 'Gupis Polymetallic Deposit', location: 'Gupis, Tehsil Yasin, District Ghizer', type: 'Polymetallic (Copper, Silica Quartz, Iron)', details: ['Mineralized vein deposit with thickness 1-6 feet', 'Strike length of 200m-400m visually assessed', 'High-grade sulfide mineralization observed'] }
    ]
  },
  {
    id: 'zircon-mines',
    name: 'Zircon Mines',
    tagline: 'Precision Mining for Rare Earth Elements.',
    logoUrl: PlaceHolderImages.find(p => p.id === 'logo-himalayan')?.imageUrl || 'https://placehold.co/128x128',
    description: 'Zircon Mines is a venture-focused company targeting high-altitude, large-scale mineral systems in the Karakoram and Himalayan ranges. Our primary focus is on identifying and extracting rare earth elements and zircon deposits essential for modern technology.',
    history: 'Established to explore the untapped potential of the highest mountain ranges in the world, Zircon Mines has quickly become a key player in the region.',
    leadership: [
      { name: 'Dr. Sarah Ahmed', title: 'Chief Geologist' },
      { name: 'Mr. Ali Raza', title: 'Operations Director' },
    ],
    projects: [
      { name: 'Karakoram Reconnaissance' },
      { name: 'Himalayan Foothills Survey' },
    ],
    status: 'Exploratory Phase',
    investorContacts: [
      { name: 'Investor Relations', email: 'invest@zirconmines.com', phone: '+92-51-9876543' },
    ],
    locations: [
      {
        name: 'Karakoram Site 1',
        polygon: [
          { lat: 35.920834, lng: 75.149722 },
          { lat: 35.925000, lng: 75.155000 },
          { lat: 35.930556, lng: 75.150278 },
          { lat: 35.926389, lng: 75.145000 },
        ],
      },
    ],
    images: galleryImages.filter(img => img.companyName === 'Himalayan Minerals Corp.'),
    videos: [
      { id: 'vid-4', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'High-Altitude Exploration Tech' }
    ],
    virtualTourUrl: '#',
    documents: [],
    deposits: [
      { name: 'Zircon', location: 'Karakoram', details: ['High purity Zircon sands'] },
      { name: 'Rare Earths', location: 'Himalayas', details: ['Pegmatite hosted REEs'] }
    ]
  },
];
