'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { Facebook, Linkedin, Menu, Twitter } from 'lucide-react';
import Navigation from './navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">MineSight Global</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Navigation />
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link
                    href="/"
                    className="flex items-center"
                >
                    <Logo className="mr-2 h-6 w-6" />
                    <span className="font-bold">MineSight Global</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        <Navigation />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search can go here */}
          </div>
          <nav className="flex items-center">
             <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
