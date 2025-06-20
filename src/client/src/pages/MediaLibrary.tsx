
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import MediaLibrarySection from '@/components/Media/MediaLibrarySection';

const MediaLibrary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MediaLibrarySection />
      </main>
      <Footer />
    </div>
  );
};

export default MediaLibrary;
