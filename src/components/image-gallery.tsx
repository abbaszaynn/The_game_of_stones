
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import type { GalleryImage } from '@/lib/types';
import { Gem, Building, Info } from 'lucide-react';

interface ImageGalleryProps {
  images: GalleryImage[];
  children: React.ReactNode;
}

export default function ImageGallery({ images, children }: ImageGalleryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-7xl w-full h-[90vh] bg-card/90 backdrop-blur-sm p-4 md:p-6 flex flex-col md:flex-row gap-4">
        <DialogHeader className="sr-only">
          <DialogTitle>Image Gallery</DialogTitle>
          <DialogDescription>
            A carousel of images from our mining sites. View images and their details.
          </DialogDescription>
        </DialogHeader>
        <div className="md:w-2/3 h-full">
            <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                    {images.map((image) => (
                    <CarouselItem key={image.id} className="h-full">
                        <div className="w-full h-full relative rounded-lg overflow-hidden">
                            <Image
                                src={image.url}
                                alt={image.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1000px"
                            />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
        <div className="md:w-1/3 h-full bg-background rounded-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 font-headline">Gallery Details</h2>
            <div className='space-y-6'>
                {images.map(image => (
                    <Card key={`detail-${image.id}`} className="p-4">
                        <h3 className="font-semibold text-lg text-primary">{image.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">{image.description}</p>
                        <div className='space-y-2 text-sm'>
                            <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-accent" />
                                <span className='font-medium'>Company:</span>
                                <span>{image.companyName}</span>
                            </div>
                            {image.mineral && (
                                <div className="flex items-center gap-2">
                                    <Gem className="w-4 h-4 text-accent" />
                                     <span className='font-medium'>Mineral:</span>
                                    <span>{image.mineral}</span>
                                </div>
                            )}
                             {image.properties && (
                                <div className="flex items-start gap-2">
                                    <Info className="w-4 h-4 text-accent mt-0.5" />
                                     <span className='font-medium'>Properties:</span>
                                    <span>{image.properties}</span>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
