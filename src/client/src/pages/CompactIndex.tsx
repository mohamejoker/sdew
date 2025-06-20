
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UIControlProvider } from '@/contexts/UIControlContext';
import SimplifiedHeader from '@/components/Layout/SimplifiedHeader';
import MinimalFooter from '@/components/Layout/MinimalFooter';
import CompactHeroSection from '@/components/Sections/CompactHeroSection';
import SimpleServicesSection from '@/components/Sections/SimpleServicesSection';
import DirectCTASection from '@/components/Sections/DirectCTASection';

const CompactIndex = () => {
  return (
    <LanguageProvider>
      <UIControlProvider>
        <div className="min-h-screen bg-white">
          <SimplifiedHeader />
          <main>
            <CompactHeroSection />
            <SimpleServicesSection />
            <DirectCTASection />
          </main>
          <MinimalFooter />
        </div>
      </UIControlProvider>
    </LanguageProvider>
  );
};

export default CompactIndex;
