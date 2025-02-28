import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { signInWithGoogle, handleRedirectResult } from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkRedirectResult = async () => {
      const { user, error } = await handleRedirectResult();
      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }
      if (user) {
        onSuccess();
      }
    };
    
    checkRedirectResult();
  }, [onSuccess]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    const { user, error } = await signInWithGoogle();
    
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    if (user) {
      onSuccess(user);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full relative animate-scale-up shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Sign in to EXP3
          </h2>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700">{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-500 text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
