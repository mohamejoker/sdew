
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import SupportSection from '@/components/Support/SupportSection';

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
};

export default Support;
