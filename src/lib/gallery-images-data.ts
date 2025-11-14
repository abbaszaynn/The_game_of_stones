
import type { GalleryImage } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const galleryImages: GalleryImage[] = [
    {
      id: 'gal-1',
      url: PlaceHolderImages.find(p => p.id === 'gallery-durr-1')?.imageUrl || 'https://placehold.co/600x400',
      title: 'Skardu Mining Operation',
      description: 'Heavy machinery at the main excavation site in Skardu.',
      companyName: 'Durr Mines and Minerals',
      mineral: 'Copper',
      properties: 'Chalcopyrite, Bornite'
    },
    {
      id: 'gal-2',
      url: PlaceHolderImages.find(p => p.id === 'gallery-durr-2')?.imageUrl || 'https://placehold.co/600x400',
      title: 'Geological Survey Team',
      description: 'Our geologists mapping out new exploration targets near the Gultari extension.',
      companyName: 'Durr Mines and Minerals',
      mineral: 'Gold',
      properties: 'Electrum, Pyrite'
    },
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
    }
  ];
