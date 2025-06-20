import React from 'react';
import FileManager from '@/components/FileManager/FileManager';

const FileManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إدارة الملفات</h1>
        <p className="text-muted-foreground">
          رفع وإدارة الملفات والمحتوى
        </p>
      </div>
      
      <FileManager />
    </div>
  );
};

export default FileManagerPage;