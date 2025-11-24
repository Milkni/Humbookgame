import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StationGame } from './components/StationGame';
import { YaQuiz } from './components/YaQuiz';
import { AiChat } from './components/AiChat';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);

  // Simple Hash Router logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'stations') setCurrentRoute(AppRoute.STATIONS);
      else if (hash === 'ya-quiz') setCurrentRoute(AppRoute.YA_QUIZ);
      else if (hash === 'chat') setCurrentRoute(AppRoute.CHAT);
      else setCurrentRoute(AppRoute.HOME);
    };

    // Initialize
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: AppRoute) => {
    let hash = '';
    switch (route) {
      case AppRoute.STATIONS: hash = 'stations'; break;
      case AppRoute.YA_QUIZ: hash = 'ya-quiz'; break;
      case AppRoute.CHAT: hash = 'chat'; break;
      default: hash = '';
    }
    window.location.hash = hash;
  };

  const renderScreen = () => {
    switch (currentRoute) {
      case AppRoute.STATIONS:
        return <StationGame onNavigate={navigate} />;
      case AppRoute.YA_QUIZ:
        return <YaQuiz onNavigate={navigate} />;
      case AppRoute.CHAT:
        return <AiChat onNavigate={navigate} />;
      case AppRoute.HOME:
      default:
        return <WelcomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default App;