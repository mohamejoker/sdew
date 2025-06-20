
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { aiAgent } from '@/services/aiAgent';
import AdvancedAIFeatures from './AdvancedAIFeatures';
import type { AIAgentResponse } from '@/services/aiAgent';

const ImageAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAgentResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsAnalyzing(true);

    try {
      const result = await aiAgent.analyzeImage(imageUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Image analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleActionClick = (action: string, data?: any) => {
    console.log('Image analysis action:', action, data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <ImageIcon className="h-5 w-5" />
          <span>محلل الصور الذكي</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              اضغط لرفع الصورة أو اسحبها هنا
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF حتى 10MB
            </p>
          </label>
        </div>

        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="المحتوى المرفوع"
              className="w-full max-h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {isAnalyzing && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="mr-2 text-sm text-gray-600">جاري تحليل الصورة...</span>
          </div>
        )}

        {analysisResult && (
          <AdvancedAIFeatures 
            response={analysisResult} 
            onActionClick={handleActionClick}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ImageAnalyzer;
