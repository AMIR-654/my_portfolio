import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';
import { InitAdminPage } from './pages/InitAdminPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'init-admin':
        return <InitAdminPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className="min-h-screen flex flex-col" dir="rtl">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="flex-1">
            {renderPage()}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
