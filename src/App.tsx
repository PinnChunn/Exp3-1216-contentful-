import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import AuthModal from './components/AuthModal';
import SkillPaths from './components/SkillPaths';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import { getCurrentUser } from './lib/auth';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [pathname]);

  return null;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
}

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initApp();
  }, []);

  const handleAuthSuccess = async (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EXP3
            </Link>
            <UserProfile 
              isAuthenticated={isAuthenticated}
              user={user}
              onLogin={() => setIsAuthModalOpen(true)}
              onLogout={() => {
                setIsAuthenticated(false);
                setUser(null);
              }}
            />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <main className="pt-16">
            <Hero />
            <Benefits />
            <section id="events" className="py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Featured Events
                </h2>
                <EventList />
              </div>
            </section>
            <SkillPaths />
          </main>
        } />
        
        <Route path="/events/:id" element={
          <EventDetail
            isAuthenticated={isAuthenticated}
            user={user}
          />
        } />
      </Routes>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}