import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Download, 
  Trash2, 
  Eye,
  Search,
  FolderPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  url?: string;
  thumbnail?: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    uploadedFiles.forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        url: URL.createObjectURL(file)
      };
      
      setFiles(prev => [...prev, newFile]);
      
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم رفع ${file.name} بنجاح`,
      });
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />;
    if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-green-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const handleDeleteSelected = () => {
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    toast({
      title: "تم حذف الملفات",
      description: `تم حذف ${selectedFiles.length} ملف بنجاح`,
    });
  };

  const handleDownload = (file: FileItem) => {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderPlus className="w-6 h-6" />
              إدارة الملفات
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                رفع ملفات
              </Button>
              {selectedFiles.length > 0 && (
                <Button 
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف المحدد ({selectedFiles.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card 
                key={file.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleFileSelect(file.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-2">
                    {file.type.startsWith('image/') && file.url ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                    
                    <div className="text-center w-full">
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {file.uploadDate.toLocaleDateString('ar-SA')}
                      </p>
                    </div>

                    <div className="flex gap-1 mt-2">
                      {file.url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, '_blank');
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file);
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'لا توجد ملفات تطابق البحث' : 'لا توجد ملفات مرفوعة'}
              </p>
              {!searchTerm && (
                <Button 
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  رفع أول ملف
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;