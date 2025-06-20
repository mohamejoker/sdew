
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ProfileSection from '@/components/Profile/ProfileSection';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
