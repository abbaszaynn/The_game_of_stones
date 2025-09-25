'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { Menu } from 'lucide-react';
import Navigation from './navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-colors duration-300",
      isScrolled ? 'bg-primary/90 backdrop-blur-sm' : 'bg-transparent'
      )}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-white" />
            <span className={cn(
              "hidden font-bold sm:inline-block",
              isScrolled ? 'text-white' : 'text-white'
              )}>GB MINES</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Navigation isScrolled={isScrolled} />
          </nav>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                    isScrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-white/80'
                    )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 bg-primary text-primary-foreground">
                <Link href="/" className="flex items-center">
                  <Logo className="mr-2 h-6 w-6" />
                  <span className="font-bold">GB MINES</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    <Navigation isScrolled={true} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
