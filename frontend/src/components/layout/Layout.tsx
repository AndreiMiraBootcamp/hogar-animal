import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollUpButton from '../others/ScrollUpButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollUpButton />
    </div>
  );
};

export default Layout;
