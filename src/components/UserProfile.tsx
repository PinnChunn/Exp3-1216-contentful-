import React from 'react';
import { User, LogOut } from 'lucide-react';

interface UserProfileProps {
  isAuthenticated: boolean;
  user: {
    name: string | null;
    email: string | null;
    avatar: string | null;
  } | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function UserProfile({ isAuthenticated, user, onLogin, onLogout }: UserProfileProps) {
  if (!isAuthenticated) {
    return (
      <button
        onClick={onLogin}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        <span>Sign In with Google</span>
      </button>
    );
  }

  return (
    <div className="relative group">
      <button 
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="User menu"
      >
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name || 'User avatar'} 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236D28D9"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
        )}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700">{user?.name || 'Account'}</span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}