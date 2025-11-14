
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
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import type { GalleryImage } from '@/lib/types';
import { Gem, Building, Info, Maximize, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageGalleryProps {
  images: GalleryImage[];
  children: React.ReactNode;
}

export default function ImageGallery({ images, children }: ImageGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState<GalleryImage | null>(null);
  const [fullScreenImage, setFullScreenImage] = React.useState<GalleryImage | null>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    setCurrentImage(images[api.selectedScrollSnap()]);

    const onSelect = () => {
      const selectedSnap = api.selectedScrollSnap();
      setCurrent(selectedSnap + 1);
      setCurrentImage(images[selectedSnap]);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, images]);
  
  const openFullScreen = (image: GalleryImage) => {
    setFullScreenImage(image);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

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
        <div className="md:w-2/3 h-full flex flex-col">
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full">
              {images.map((image) => (
                <CarouselItem key={image.id} className="h-full">
                  <div className="w-full h-full relative rounded-lg overflow-hidden group">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1000px"
                    />
                    <div 
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      onClick={() => openFullScreen(image)}
                    >
                      <Button variant="outline" size="icon">
                        <Maximize className="w-6 h-6"/>
                        <span className="sr-only">View full screen</span>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
           <div className="py-2 text-center text-sm text-muted-foreground">
            Image {current} of {count}
          </div>
        </div>
        <div className="md:w-1/3 h-full bg-background rounded-lg p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 font-headline">Image Details</h2>
          {currentImage && (
            <Card className="p-4">
              <h3 className="font-semibold text-lg text-primary">{currentImage.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{currentImage.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-accent" />
                  <span className="font-medium">Company:</span>
                  <span>{currentImage.companyName}</span>
                </div>
                {currentImage.mineral && (
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-accent" />
                    <span className="font-medium">Mineral:</span>
                    <span>{currentImage.mineral}</span>
                  </div>
                )}
                {currentImage.properties && (
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-accent mt-0.5" />
                    <span className="font-medium">Properties:</span>
                    <span>{currentImage.properties}</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
      {fullScreenImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99]"
          onClick={closeFullScreen}
        >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:text-white/80" onClick={closeFullScreen}>
                <X className="w-8 h-8"/>
                <span className="sr-only">Close</span>
            </Button>
            <Image
                src={fullScreenImage.url}
                alt={fullScreenImage.title}
                width={1920}
                height={1080}
                className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
      )}
    </Dialog>
  );
}
