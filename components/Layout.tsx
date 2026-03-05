'use client';

import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  currentPage?: string;
}

export default function Layout({ children, currentPage }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
