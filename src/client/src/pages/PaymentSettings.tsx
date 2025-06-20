
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import PaymentSettings from '@/components/Payment/PaymentSettings';

const PaymentSettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PaymentSettings />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettingsPage;
