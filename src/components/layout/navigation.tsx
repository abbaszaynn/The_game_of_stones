'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/companies', label: 'Companies' },
  { href: '/map', label: 'Map' },
  { href: '/news', label: 'News' },
  { href: '/documents', label: 'Documents' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation({ isScrolled, onLinkClick }: { isScrolled?: boolean; onLinkClick?: () => void }) {
  const pathname = usePathname();

  const linkColor = isScrolled ? 'text-white' : 'text-white';
  const linkColorHover = isScrolled ? 'hover:text-white/80' : 'hover:text-white/80';
  const activeLinkColor = isScrolled ? 'text-white font-semibold' : 'text-white font-semibold';
  const inactiveLinkColor = isScrolled ? 'text-white/70' : 'text-white/70';

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors',
            'md:text-base',
            linkColor,
            linkColorHover,
            pathname === item.href ? activeLinkColor : inactiveLinkColor
          )}
          onClick={onLinkClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
