
'use client';

import * as React from 'react';
import NextImage from 'next/image';
import {
  Dialog,
  DialogContent,
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
import { Gem, Building, Info, Maximize, X, ArrowLeft, Download, Grid3X3 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImageGalleryProps {
  images: GalleryImage[];
  children: React.ReactNode;
}

export default function ImageGallery({ images, children }: ImageGalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'detail'>('grid');

  // Carousel States
  const [api, setApi] = React.useState<CarouselApi>();
  const [startIndex, setStartIndex] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [currentImage, setCurrentImage] = React.useState<GalleryImage | null>(null);
  const [fullScreenImage, setFullScreenImage] = React.useState<GalleryImage | null>(null);

  // Filter Unique Images based on URL to avoid duplicates in the grid
  const uniqueImages = React.useMemo(() => {
    const seen = new Set();
    return images.filter(image => {
      const duplicate = seen.has(image.url);
      seen.add(image.url);
      return !duplicate;
    });
  }, [images]);

  // Handle Image Click in Grid
  const handleImageClick = (index: number) => {
    setStartIndex(index);
    setViewMode('detail');
  };

  // Carousel Logic
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    setCurrentImage(uniqueImages[api.selectedScrollSnap()]);

    const onSelect = () => {
      const selectedSnap = api.selectedScrollSnap();
      setCurrent(selectedSnap + 1);
      setCurrentImage(uniqueImages[selectedSnap]);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, uniqueImages]);

  // Reset view when dialog opens/closes
  React.useEffect(() => {
    if (!open) {
      // Small delay to prevent flashing when closing
      const timer = setTimeout(() => setViewMode('grid'), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const openFullScreen = (image: GalleryImage) => {
    setFullScreenImage(image);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] bg-zinc-950/95 backdrop-blur-md border-zinc-800 p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 py-4 border-b border-white/10 flex flex-row items-center justify-between shrink-0 bg-black/20">
            <div className="flex items-center gap-4">
              {viewMode === 'detail' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-full hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <DialogTitle className="text-xl font-headline text-white flex items-center gap-2">
                {viewMode === 'grid' ? (
                  <>
                    <Grid3X3 className="w-5 h-5 text-primary" /> Gallery
                  </>
                ) : (
                  currentImage?.title || 'Image Details'
                )}
              </DialogTitle>
            </div>

            {/* Close button is handled by DialogPrimitive but we can add custom controls if needed */}
          </DialogHeader>

          <div className="flex-1 overflow-hidden relative">
            {viewMode === 'grid' ? (
              <ScrollArea className="h-full w-full p-4 md:p-6 bg-black/40">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                  {uniqueImages.map((image, index) => (
                    <div
                      key={`${image.id}-${index}`}
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-zinc-900 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => handleImageClick(index)}
                    >
                      <NextImage
                        src={image.url}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-medium truncate text-sm">{image.title}</p>
                        <p className="text-zinc-400 text-xs truncate">{image.companyName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              // Detail View (Carousel + Info)
              <div className="flex flex-col lg:flex-row h-full">

                {/* Image Section */}
                <div className="flex-1 relative bg-black/95 flex items-center justify-center p-4 lg:p-8 overflow-hidden group/main">

                  {/* Background Blur Effect */}
                  {currentImage && (
                    <div className="absolute inset-0 opacity-20 blur-3xl scale-110 pointer-events-none">
                      <NextImage src={currentImage.url} alt="" fill className="object-cover" />
                    </div>
                  )}

                  <Carousel setApi={setApi} opts={{ startIndex }} className="w-full h-full max-w-5xl mx-auto z-10 [&>.overflow-hidden]:h-full">
                    <CarouselContent className="h-full">
                      {uniqueImages.map((image) => (
                        <CarouselItem key={image.id} className="h-full pl-0">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <NextImage
                              src={image.url}
                              alt={image.title}
                              fill
                              className="object-contain drop-shadow-2xl"
                              priority
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 bg-black/50 border-white/10 text-white hover:bg-primary hover:text-black hover:border-primary transition-colors" />
                    <CarouselNext className="right-4 bg-black/50 border-white/10 text-white hover:bg-primary hover:text-black hover:border-primary transition-colors" />
                  </Carousel>

                  {/* Overlaid Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                    {currentImage && (
                      <>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full shadow-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black"
                          onClick={() => openFullScreen(currentImage)}
                          title="Fullscreen"
                        >
                          <Maximize className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full shadow-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black"
                          asChild
                        >
                          <a href={currentImage.url} download target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-zinc-400">
                    {current} / {count}
                  </div>
                </div>

                {/* Details Sidebar */}
                <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 bg-zinc-950 border-l border-white/5 p-6 overflow-y-auto">
                  {currentImage && (
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold font-headline text-primary mb-2 line-clamp-2">{currentImage.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{currentImage.description}</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                            <Building className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Company</p>
                            <p className="text-sm font-medium text-zinc-200">{currentImage.companyName}</p>
                          </div>
                        </div>

                        {currentImage.mineral && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                              <Gem className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Mineral</p>
                              <p className="text-sm font-medium text-zinc-200">{currentImage.mineral}</p>
                            </div>
                          </div>
                        )}

                        {currentImage.properties && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                              <Info className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Properties</p>
                              <p className="text-sm font-medium text-zinc-200">{currentImage.properties}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" asChild>
                        <a href={currentImage.url} download target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" /> Download Original
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Overlay */}
      {/* Fullscreen Overlay */}
      <Dialog open={!!fullScreenImage} onOpenChange={() => closeFullScreen()}>
        <DialogContent className="max-w-[100vw] h-[100vh] border-none bg-black/95 flex items-center justify-center p-0 m-0 z-[200] [&>button]:hidden">
          <DialogHeader className="hidden">
            <DialogTitle>Full Screen Image</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-full flex items-center justify-center" onClick={closeFullScreen}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white/50 hover:text-white rounded-full hover:bg-white/10 z-[210]"
              onClick={closeFullScreen}
            >
              <X className="w-8 h-8" />
              <span className="sr-only">Close</span>
            </Button>

            {fullScreenImage && (
              <NextImage
                src={fullScreenImage.url}
                alt={fullScreenImage.title}
                width={1920}
                height={1080}
                className="max-w-[95vw] max-h-[95vh] object-contain select-none"
                priority
                quality={100}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
