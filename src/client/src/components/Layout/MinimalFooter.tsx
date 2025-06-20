
import React from 'react';

const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-lg font-bold">خدمات الذكاء الاصطناعي</span>
        </div>
        
        <p className="text-gray-400 text-sm">
          © {currentYear} جميع الحقوق محفوظة | مدعوم بتقنيات الذكاء الاصطناعي المتطورة
        </p>
      </div>
    </footer>
  );
};

export default MinimalFooter;
