
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const UserReviews = () => {
  const reviews = [
    { text: "التطبيق سريع جداً ومفيد", author: "أحمد محمد" },
    { text: "واجهة ممتازة وسهلة الاستخدام", author: "فاطمة علي" },
    { text: "الذكاء الاصطناعي مذهل!", author: "محمود سالم" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">آراء المستخدمين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-2">"{review.text}"</p>
              <p className="text-sm text-gray-500">- {review.author}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserReviews;
