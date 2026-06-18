'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
}

interface BottomNavProps {
  items: NavItem[];
  activeKey: string;
}

export default function BottomNav({ items, activeKey }: BottomNavProps) {
  return (
    <nav className="h-[76px] bg-surface border-t border-border flex items-center justify-around sticky bottom-0 z-10">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex-1 h-full flex flex-col items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase no-underline ${
              isActive ? 'text-green-dark' : 'text-[#94a3a0]'
            }`}
          >
            <div className="flex items-center justify-center h-[18px]">
              {item.icon}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
