import React, { useState } from 'react';
import { STATION_DATA } from '../constants';
import { QuestionType, AppRoute } from '../types';
import { Button } from './Button';
import { ArrowLeft, Check, Lock } from 'lucide-react';

interface StationGameProps {
  onNavigate: (route: AppRoute) => void;
}

export const StationGame: React.FC<StationGameProps> = ({ onNavigate }) => {
  // Track revealed state for each station by ID
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [wrongAnswers, setWrongAnswers] = useState<Record<string, boolean>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleMultipleChoice = (stationId: string, option: string, correctAnswer: string) => {
    if (option === correctAnswer) {
      setRevealed(prev => ({ ...prev, [stationId]: true }));
      setWrongAnswers(prev => ({ ...prev, [stationId]: false }));
    } else {
      setWrongAnswers(prev => ({ ...prev, [stationId]: true }));
    }
  };

  const handleOpenInput = (stationId: string) => {
    const val = inputs[stationId]?.trim();
    if (val && val.length > 0) {
      setRevealed(prev => ({ ...prev, [stationId]: true }));
      setWrongAnswers(prev => ({ ...prev, [stationId]: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-mkp-gray text-white p-4 shadow-md flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => onNavigate(AppRoute.HOME)} className="p-1 hover:bg-gray-700 rounded">
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Poznej knihovnu</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
        {STATION_DATA.map((station) => {
          const isSolved = revealed[station.id];
          const isWrong = !isSolved && wrongAnswers[station.id];

          return (
            <div key={station.id} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${isSolved ? 'border-green-500' : isWrong ? 'border-red-300' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-mkp-red">{station.title}</h3>
                {isSolved && <Check className="text-green-500" />}
              </div>
              
              <p className="mb-4 text-gray-700 font-medium">{station.question}</p>

              {!isSolved ? (
                <div>
                  {station.type === QuestionType.MULTIPLE_CHOICE ? (
                    <div className="grid grid-cols-1 gap-2">
                      {station.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleMultipleChoice(station.id, opt, station.correctAnswer!)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg text-left transition-colors font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder={station.placeholder}
                        value={inputs[station.id] || ''}
                        onChange={(e) => setInputs(prev => ({ ...prev, [station.id]: e.target.value }))}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-mkp-red focus:outline-none"
                      />
                      <Button onClick={() => handleOpenInput(station.id)} variant="primary" className="mt-2">
                        Odpovědět
                      </Button>
                    </div>
                  )}
                  {isWrong && (
                    <p className="text-red-600 font-bold text-sm mt-3 animate-pulse">
                      Myslíš že to je správně?
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-bold">
                  Úkol splněn! Část hesla získána.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Password Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-20">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 text-center">Tajné heslo</p>
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {STATION_DATA.map((station) => {
             const isSolved = revealed[station.id];
             const isWrong = !isSolved && wrongAnswers[station.id] && station.wrongReward;

             let content;
             let containerClass;

             if (isSolved) {
               content = station.rewardWord;
               containerClass = 'bg-mkp-red text-white border-mkp-red';
             } else if (isWrong) {
               content = station.wrongReward;
               containerClass = 'bg-gray-200 text-gray-700 border-gray-400 border-dashed';
             } else {
               content = <Lock size={14} />;
               containerClass = 'bg-gray-100 text-gray-400 border-dashed border-gray-300';
             }

             return (
                <div 
                  key={station.id} 
                  className={`
                    flex-1 h-12 flex items-center justify-center rounded-lg text-xs sm:text-sm font-bold border-2 transition-all duration-300
                    ${containerClass}
                  `}
                >
                  {content}
                </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};