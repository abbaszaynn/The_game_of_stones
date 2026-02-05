
import type { GalleryImage } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const galleryImages: GalleryImage[] = [

  {
    id: 'gal-3',
    url: PlaceHolderImages.find(p => p.id === 'gallery-lux-1')?.imageUrl || 'https://placehold.co/600x400',
    title: 'Gupis Site Preparation',
    description: 'Initial earthworks for the Gupis exploration project.',
    companyName: 'Earth Lux Mines',
    mineral: 'Copper',
    properties: 'Malachite, Azurite'
  },
  {
    id: 'gal-4',
    url: PlaceHolderImages.find(p => p.id === 'gallery-lux-2')?.imageUrl || 'https://placehold.co/600x400',
    title: 'High-Grade Copper Ore',
    description: 'A sample of high-grade copper ore recovered from a test pit in Gupis.',
    companyName: 'Earth Lux Mines',
    mineral: 'Copper',
    properties: 'Native Copper, Cuprite'
  },
  {
    id: 'gal-5',
    url: PlaceHolderImages.find(p => p.id === 'gallery-himalayan-1')?.imageUrl || 'https://placehold.co/600x400',
    title: 'Karakoram Range',
    description: 'The breathtaking and challenging terrain of our Karakoram project area.',
    companyName: 'Himalayan Minerals Corp.',
    mineral: 'Molybdenum',
    properties: 'Molybdenite'
  },
  {
    id: 'gal-6',
    url: PlaceHolderImages.find(p => p.id === 'gallery-himalayan-2')?.imageUrl || 'https://placehold.co/600x400',
    title: 'Core Sample Drilling',
    description: 'A drilling team extracting core samples at high altitude.',
    companyName: 'Himalayan Minerals Corp.',
    mineral: 'Rare Earth Elements',
    properties: 'Bastnäsite, Monazite'
  },
  {
    id: 'gal-mo-1',
    url: '/images/mo-1.jpg',
    title: 'Molybdenum - Gultari Mine',
    description: 'Molybdenum discovered at Durr Mines and Minerals, Gultari. A potential high-value resource for industrial applications.',
    companyName: 'Durr Mines and Minerals',
    mineral: 'Molybdenum',
    properties: 'Molybdenite'
  },
  {
    id: 'gal-mo-2',
    url: '/images/mo-2.jpg',
    title: 'Molybdenum Ore Sample',
    description: 'Close-up of Molybdenum ore from the Gultari site. This mineral is essential for high-strength steel alloys.',
    companyName: 'Durr Mines and Minerals',
    mineral: 'Molybdenum',
    properties: 'Molybdenite, Quartz'
  },
  {
    id: 'gal-mo-3',
    url: '/images/mo-3.jpg',
    title: 'Mineral Exploration - Gultari',
    description: 'Surveying the Gultari mine for Molybdenum deposits. The site shows promising geological indicators.',
    companyName: 'Durr Mines and Minerals',
    mineral: 'Molybdenum',
    properties: 'Molybdenite'
  },
  {
    id: 'gal-qz-1',
    url: '/images/quartz-1.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  },
  {
    id: 'gal-qz-2',
    url: '/images/quartz-2.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  },
  {
    id: 'gal-qz-3',
    url: '/images/quartz-3.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  },
  {
    id: 'gal-qz-4',
    url: '/images/quartz-4.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  },
  {
    id: 'gal-qz-5',
    url: '/images/quartz-5.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  },
  {
    id: 'gal-qz-6',
    url: '/images/quartz-6.jpg',
    title: 'Quartz Decorated Piece',
    description: 'Exquisite Quartz gemstone specimen. These gemstones can be found in any mine.',
    companyName: 'Zircon Mines',
    mineral: 'Quartz Generative Pieces',
    properties: 'Quartz, Gemstone'
  }
];
