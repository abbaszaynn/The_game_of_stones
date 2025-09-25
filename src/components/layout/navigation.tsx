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
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-white/80',
            pathname === item.href ? 'text-white' : 'text-white/60',
            'md:text-white md:hover:text-white/80',
            pathname === item.href ? 'md:text-white' : 'md:text-white/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
