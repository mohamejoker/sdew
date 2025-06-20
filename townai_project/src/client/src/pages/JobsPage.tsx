
import React, { useState } from 'react';
import JobManagement from '@/components/Jobs/JobManagement';
import JobForm from '@/components/Jobs/JobForm';

const JobsPage = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  const handleJobSubmit = (jobData: any) => {
    console.log('تم إرسال الوظيفة:', jobData);
    // هنا يمكن إضافة منطق حفظ الوظيفة
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JobManagement />
      {showJobForm && (
        <JobForm 
          onClose={() => setShowJobForm(false)}
          onSubmit={handleJobSubmit}
        />
      )}
    </div>
  );
};

export default JobsPage;
