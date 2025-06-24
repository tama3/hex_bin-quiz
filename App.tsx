import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMode, CurrentQuestion } from './types';
import { 
  generateRandomByte, 
  decimalToHex, 
  decimalToBinary, 
  isValidHexInput, 
  isValidBinaryInput,
  formatBinaryString
} from './utils/conversionUtils';
import ModeSelector from './components/ModeSelector';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerInput from './components/AnswerInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import ScoreDisplay from './components/ScoreDisplay';
import LanguageSelector from './components/LanguageSelector'; // Added
import { useLanguage } from './contexts/LanguageContext'; // Added

const App: React.FC = () => {
  const { t } = useLanguage(); // Added
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.HexToBin);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionsAttempted, setQuestionsAttempted] = useState<number>(0);

  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null);

  const generateNewQuestion = useCallback(() => {
    const num = generateRandomByte();
    setCurrentQuestion({
      decimalValue: num,
      hexValue: decimalToHex(num),
      binaryValue: decimalToBinary(num),
    });
    setUserInput('');
    setFeedback(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateNewQuestion();
  }, [gameMode, generateNewQuestion]);

  const handleModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return; 

    const processedUserInput = userInput.replace(/\s+/g, ''); 

    if (processedUserInput === '') {
      setFeedback(t('feedbackEmptyInput'));
      setIsCorrect(null);
      setIsAnswerSubmitted(true);
      return;
    }

    let normalizedInput = processedUserInput;
    let expectedAnswer: string;
    let isValidInputCheck = false;
    let requiredFormatKey: 'targetTypeBin' | 'targetTypeHex';

    if (gameMode === GameMode.HexToBin) { 
      isValidInputCheck = isValidBinaryInput(normalizedInput);
      expectedAnswer = currentQuestion.binaryValue;
      requiredFormatKey = 'targetTypeBin';
    } else { 
      normalizedInput = normalizedInput.toUpperCase(); 
      isValidInputCheck = isValidHexInput(normalizedInput);
      expectedAnswer = currentQuestion.hexValue;
      requiredFormatKey = 'targetTypeHex';
    }

    if (!isValidInputCheck) {
      setFeedback(t('feedbackInvalidFormat', t(requiredFormatKey)));
      setIsCorrect(null);
      setIsAnswerSubmitted(true);
      return;
    }
    
    setQuestionsAttempted(prev => prev + 1);
    if (normalizedInput === expectedAnswer) {
      setFeedback(t('feedbackCorrect'));
      setIsCorrect(true);
      setScore(prev => prev + 1);
    } else {
      const displayExpectedAnswer = gameMode === GameMode.HexToBin 
        ? formatBinaryString(expectedAnswer) 
        : expectedAnswer;
      setFeedback(t('feedbackIncorrect', displayExpectedAnswer));
      setIsCorrect(false);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = useCallback(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (isAnswerSubmitted && (event.key === 'N' || event.key === 'n')) {
        event.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isAnswerSubmitted, handleNextQuestion]);

  useEffect(() => {
    if (isAnswerSubmitted && nextQuestionButtonRef.current) {
      nextQuestionButtonRef.current.focus();
    }
  }, [isAnswerSubmitted]);

  useEffect(() => {
    document.title = t('appName');
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-400 to-indigo-600">
      <div className="w-full max-w-2xl bg-slate-50 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <header className="mb-2 text-center"> {/* Reduced mb-8 to mb-2 to make space for lang selector */}
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {t('appName')}
          </h1>
          <p className="text-slate-600 mt-2">{t('appSubtitle')}</p>
        </header>

        <LanguageSelector /> {/* Added */}

        <ModeSelector currentMode={gameMode} onModeChange={handleModeChange} />
        <ScoreDisplay score={score} questionsAttempted={questionsAttempted} />

        {currentQuestion && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <QuestionDisplay mode={gameMode} question={currentQuestion} />
            <AnswerInput
              mode={gameMode}
              userInput={userInput}
              onInputChange={setUserInput}
              onSubmit={handleSubmit}
              isSubmitted={isAnswerSubmitted}
            />
            {isAnswerSubmitted && feedback && (
              <FeedbackDisplay feedback={feedback} isCorrect={isCorrect} />
            )}
          </div>
        )}

        {isAnswerSubmitted && (
          <div className="text-center mt-6">
            <button
              ref={nextQuestionButtonRef}
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              aria-label={t('nextQuestionButtonAria')}
            >
              {t('nextQuestionButton')}
            </button>
          </div>
        )}
      </div>
       <footer className="mt-8 text-center text-slate-200 text-sm">
        <p>{t('footerText', new Date().getFullYear())}</p>
      </footer>
    </div>
  );
};

export default App;
