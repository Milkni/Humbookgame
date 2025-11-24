import React, { useState, useEffect } from 'react';
import { YA_QUIZ_VARIANTS } from '../constants';
import { AppRoute, QuizVariant } from '../types';
import { Button } from './Button';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface YaQuizProps {
  onNavigate: (route: AppRoute) => void;
}

export const YaQuiz: React.FC<YaQuizProps> = ({ onNavigate }) => {
  const [currentVariant, setCurrentVariant] = useState<QuizVariant | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // Store selected indices
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize random variant on mount
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const randomIndex = Math.floor(Math.random() * YA_QUIZ_VARIANTS.length);
    setCurrentVariant(YA_QUIZ_VARIANTS[randomIndex]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
    setScore(0);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentVariant && currentQuestionIndex < currentVariant.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: number[]) => {
    if (!currentVariant) return;

    let correctCount = 0;
    currentVariant.questions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizFinished(true);
  };

  if (!currentVariant) return <div className="p-10 text-center">Načítám kvíz...</div>;

  const currentQuestion = currentVariant.questions[currentQuestionIndex];
  const totalQuestions = currentVariant.questions.length;

  // --- Results View ---
  if (quizFinished) {
    const isPerfect = score === totalQuestions;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
          {isPerfect ? (
            <>
              <div className="mb-6 flex justify-center">
                <CheckCircle2 size={64} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-mkp-red mb-4">Výborně!</h2>
              <p className="text-gray-700 mb-6">
                Odpověděl jsi na všechno správně! Jsi opravdu znalec a všichni knihovníci se Ti klaní!
              </p>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                 <p className="text-sm text-gray-500 uppercase mb-1">Heslo je</p>
                 <p className="text-xl font-black text-mkp-red">„S KNIHOVNOU NEJSTE SAMI“</p>
              </div>
              <Button onClick={() => onNavigate(AppRoute.HOME)} fullWidth>
                Návrat do hlavního menu
              </Button>
            </>
          ) : (
            <>
              <div className="mb-6 flex justify-center">
                <AlertCircle size={64} className="text-mkp-gray" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Skoro tam!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Zodpověděl jsi <span className="font-bold text-mkp-red">{score}</span> správných odpovědí z {totalQuestions}.
              </p>
              <div className="space-y-3">
                <Button onClick={startNewQuiz} variant="primary" fullWidth>
                  Zkusit ještě jednou
                </Button>
                <Button onClick={() => onNavigate(AppRoute.HOME)} variant="secondary" fullWidth>
                  Návrat do hlavního menu
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // --- Quiz View ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <div className="bg-mkp-gray text-white p-4 shadow-md flex items-center gap-3">
        <button onClick={() => onNavigate(AppRoute.HOME)} className="p-1 hover:bg-gray-700 rounded">
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-bold">YA Kvíz</h2>
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full p-6">
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
          <span>Otázka {currentQuestionIndex + 1} / {totalQuestions}</span>
          <span className="bg-gray-200 px-2 py-1 rounded text-xs">Varianta {currentVariant.id}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
                {currentQuestion.text}
            </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left bg-white p-4 rounded-xl border-2 border-transparent shadow-sm hover:border-mkp-red hover:shadow-md transition-all font-medium text-gray-700"
            >
              <span className="inline-block w-6 font-bold text-mkp-red mr-2">
                {String.fromCharCode(97 + idx)})
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};