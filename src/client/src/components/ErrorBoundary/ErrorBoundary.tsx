
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'wouter';
import { ErrorHandler } from '@/utils/errorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // استخدام ErrorHandler
    ErrorHandler.logError(error, 'ErrorBoundary');
    
    // استدعاء onError callback إذا كان متوفراً
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-700">حدث خطأ غير متوقع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                نعتذر، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Error:</strong> {this.state.error.message}
                </div>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button onClick={this.handleRetry} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  إعادة المحاولة
                </Button>
                <Link to="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    الصفحة الرئيسية
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
