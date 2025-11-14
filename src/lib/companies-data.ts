import type { Company } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { galleryImages } from '@/lib/gallery-images-data';

export const companies: Omit<Company, 'documents'>[] = [
    {
      id: 'durr-mines-and-minerals',
      name: 'Durr Mines and Minerals',
      tagline: 'Unearthing the Future, Responsibly.',
      logoUrl: PlaceHolderImages.find(p => p.id === 'logo-durr')?.imageUrl || 'https://placehold.co/128x128',
      description: 'Durr Mines and Minerals is a leading exploration and development company focused on critical and precious metals in the Gilgit-Baltistan region. With a commitment to sustainable practices and community engagement, we are at the forefront of unlocking the mineral wealth of Pakistan.',
      history: 'Founded in 2020, Durr Mines has quickly established itself as a key player in the region. Our journey began with the acquisition of the Skardu project, a high-potential copper and gold deposit. Since then, we have expanded our portfolio to include several other promising exploration sites, driven by a vision to become a cornerstone of the national mining industry.',
      leadership: [
        { name: 'Mr. Aurangzeb Khan', title: 'Chairman & CEO' },
        { name: 'Mr. Ali Murad', title: 'Chief Geologist' },
        { name: 'Ms. Fatima Ahmed', title: 'Head of Operations' },
      ],
      projects: [
        { name: 'Skardu Copper-Gold Project' },
        { name: 'Bagicha Marble Quarry' },
        { name: 'Rondu Base Metals Exploration' },
      ],
      status: 'Operational',
      investorContacts: [
        { name: 'Investor Relations Dept.', email: 'investors@durrmines.com', phone: '+92-311-1234567' }
      ],
      locations: [
        { name: 'Skardu Mine', polygon: [{ lat: 35.31, lng: 75.63 }, { lat: 35.33, lng: 75.63 }, { lat: 35.33, lng: 75.65 }, { lat: 35.31, lng: 75.65 }] },
        { name: 'Bagicha Quarry', polygon: [{ lat: 35.5, lng: 75.7 }, { lat: 35.52, lng: 75.7 }, { lat: 35.52, lng: 75.72 }, { lat: 35.5, lng: 75.72 }] },
      ],
      images: galleryImages.filter(img => img.companyName === 'Durr Mines and Minerals'),
      videos: [
        { id: 'vid-1', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'Drone Flyover of Skardu Site' },
        { id: 'vid-2', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'Community Water Project Launch' }
      ],
      virtualTourUrl: '#',
      deposits: [
        { name: 'Main Skardu Deposit', location: 'Central Skardu Lease Area', type: 'Porphyry Copper-Gold', details: ['Estimated 1.2 Mt copper', 'Significant gold and silver credits', 'Open-pit potential'] },
        { name: 'Gultari Extension', location: 'Gultari Tehsil, Skardu', type: 'Vein-hosted Copper', details: ['High-grade copper intercepts', 'Underground mining prospect', 'Further drilling planned for Q4 2024'] }
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
      deposits: [
        { name: 'Gupis Polymetallic Deposit', location: 'Gupis, Tehsil Yasin, District Ghizer', type: 'Polymetallic (Copper, Silica Quartz, Iron)', details: ['Mineralized vein deposit with thickness 1-6 feet', 'Strike length of 200m-400m visually assessed', 'High-grade sulfide mineralization observed'] }
      ]
    },
    {
      id: 'himalayan-minerals-corp',
      name: 'Himalayan Minerals Corp.',
      tagline: 'Reaching New Peaks in Mineral Exploration',
      logoUrl: PlaceHolderImages.find(p => p.id === 'logo-himalayan')?.imageUrl || 'https://placehold.co/128x128',
      description: 'Himalayan Minerals Corp. is a venture-focused company targeting high-altitude, large-scale mineral systems in the Karakoram and Himalayan ranges. Our experienced team utilizes advanced satellite and geophysical survey techniques to identify untapped resources.',
      history: 'Himalayan Minerals was formed by a consortium of international geologists and financiers in 2021. The company has secured exploration licenses for several highly prospective, yet challenging, terrains. Our flagship project aims to delineate a world-class molybdenum and rare earth element (REE) deposit.',
      leadership: [
        { name: 'Dr. Evelyn Reed', title: 'President & Chief Geoscientist' },
        { name: 'Mr. Kenji Tanaka', title: 'VP, Corporate Development' },
      ],
      projects: [
        { name: 'Karakoram Moly-REE Project' },
        { name: 'Himalayan Skarn Exploration' }
      ],
      status: 'Exploratory Phase',
      investorContacts: [
        { name: 'International Office', email: 'info@himalayan-minerals.com', phone: '+1-416-555-0123' }
      ],
      locations: [
        { name: 'Karakoram Moly-REE', polygon: [{ "lat": 36.0, "lng": 76.5 }, { "lat": 36.05, "lng": 76.5 }, { "lat": 36.05, "lng": 76.55 }, { "lat": 36.0, "lng": 76.55 }] }
      ],
      images: galleryImages.filter(img => img.companyName === 'Himalayan Minerals Corp.'),
      videos: [
        { id: 'vid-4', url: 'https://www.youtube.com/embed/9bZkp7q19f0', title: 'High-Altitude Exploration Tech' }
      ],
      virtualTourUrl: '#',
      deposits: []
    }
  ];
