import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, History, Plus, Settings, MapPin, Heart } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('helpnear_onboarding_complete');
    setHasCompletedOnboarding(!!onboardingComplete);
  }, [location]);

  // Исправлен условие проверки - убираем автоматический редирект
  if (!hasCompletedOnboarding && currentPageName !== 'Onboarding') {
    // Убираем принудительный редирект, показываем онбординг
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">{children}</div>;
  }

  if (currentPageName === 'Onboarding') {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">{children}</div>;
  }

  const navigationItems = [
    { name: 'Home', icon: Home, path: 'Home' },
    { name: 'History', icon: History, path: 'History' },
    { name: 'Submit', icon: Plus, path: 'Submit' },
    { name: 'Settings', icon: Settings, path: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <style>{`
        :root {
          --primary-blue: #2563eb;
          --soft-blue: #dbeafe;
          --trust-green: #10b981;
          --warm-gray: #6b7280;
          --success-green: #059669;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">HelpNear</h1>
                <p className="text-xs text-gray-500">Agent</p>
              </div>
            </div>
            <MapPin className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex">
            {navigationItems.map((item) => {
              const isActive = location.pathname === createPageUrl(item.path);
              return (
                <Link
                  key={item.name}
                  to={createPageUrl(item.path)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
