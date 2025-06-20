
import React from 'react';
import SimpleServicesSection from '@/components/Sections/SimpleServicesSection';
import SimplifiedHeader from '@/components/Layout/SimplifiedHeader';
import MinimalFooter from '@/components/Layout/MinimalFooter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UIControlProvider } from '@/contexts/UIControlContext';

const PublicServicesPage = () => {
  return (
    <LanguageProvider>
      <UIControlProvider>
        <div className="min-h-screen bg-gray-50">
          <SimplifiedHeader />
          <main className="pt-16">
            <SimpleServicesSection />
          </main>
          <MinimalFooter />
        </div>
      </UIControlProvider>
    </LanguageProvider>
  );
};

export default PublicServicesPage;
