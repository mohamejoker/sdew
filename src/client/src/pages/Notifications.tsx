
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import NotificationCenter from '@/components/Notifications/NotificationCenter';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <NotificationCenter />
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
