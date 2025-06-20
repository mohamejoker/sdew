
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import MobileOptimizations from '@/components/Mobile/MobileOptimizations';

const MobileApp = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <MobileOptimizations />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default MobileApp;
