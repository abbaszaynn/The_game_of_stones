import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md">
      <div className="container py-10 md:h-24 md:py-0">
        <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:items-center md:gap-0 h-full">
          {/* Developer Credit - Left Aligned */}
          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left order-3 md:order-1">
            <p className="text-sm text-white mb-2">Developer Rights</p>
            <Link
              href="http://www.linkedin.com/in/zain-abbas1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white hover:text-white/80 transition-colors"
            >
              Zain Abbas
            </Link>
          </div>

          {/* Copyright - Centered */}
          <div className="flex flex-col items-center justify-center order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6 hidden md:block" />
              <p className="text-center text-sm leading-loose text-muted-foreground">
                &copy; {new Date().getFullYear()} Game of Stones.
              </p>
            </div>
          </div>

          {/* Socials & Legal - Right Aligned */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-end order-2 md:order-3">
            <nav className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:abbaszayn08@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.instagram.com/abbas__zayn?igsh=MWVqb2V0ZjI1cHRucA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="http://www.linkedin.com/in/zain-abbas1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
