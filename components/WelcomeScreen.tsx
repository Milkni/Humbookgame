import React from 'react';
import { Button } from './Button';
import { AppRoute } from '../types';
import { BookOpen, HelpCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (route: AppRoute) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-mkp-red p-6 text-white text-center shadow-lg rounded-b-3xl">
        <h1 className="text-3xl font-bold mb-2">Humbook festivalová hra</h1>
        <div className="w-16 h-1 bg-white mx-auto opacity-50 rounded"></div>
      </header>

      <main className="flex-1 p-6 flex flex-col justify-center items-center gap-8 max-w-md mx-auto w-full">
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-mkp-gray">
          <p className="text-gray-700 leading-relaxed">
            Vyber si – můžeš zkusit vědomostní kvíz anebo si něco vyzkoušet na našich stanovištích a zjistit během vyrábění a zkoušení odpovědi na naše otázky.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 font-semibold text-mkp-red">
            Zjisti heslo a naše AI knihovnice ti poradí, kde získáš razítko.
          </div>
        </div>

        <div className="w-full space-y-4">
          <Button 
            onClick={() => onNavigate(AppRoute.STATIONS)} 
            fullWidth
            variant="secondary"
          >
            <BookOpen size={20} />
            Poznej knihovnu
          </Button>

          <Button 
            onClick={() => onNavigate(AppRoute.YA_QUIZ)} 
            fullWidth
            variant="primary"
          >
            <HelpCircle size={20} />
            YA kvíz
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center max-w-sm">
          Tato aplikace vznikla díky AI. Jak umělou inteligenci bezpečně využívat, k čemu se hodí, jaká jsou rizika, to tě v knihovně rádi naučíme.
        </p>
      </main>

      <footer className="p-4 text-center text-gray-400 text-xs">
        © Městská knihovna v Praze
      </footer>
    </div>
  );
};