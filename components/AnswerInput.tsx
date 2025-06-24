import React, { useRef, useEffect } from 'react';
import { GameMode } from '../types';
import { useLanguage } from '../contexts/LanguageContext'; // Added

interface AnswerInputProps {
  mode: GameMode;
  userInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitted: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ mode, userInput, onInputChange, onSubmit, isSubmitted }) => {
  const { t } = useLanguage(); // Added
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSubmitted, mode]);

  const placeholderKey = mode === GameMode.HexToBin ? 'answerPlaceholderHexToBin' : 'answerPlaceholderBinToHex';
  const placeholder = t(placeholderKey);
  const pattern = mode === GameMode.HexToBin ? "[01\\s]*" : "[0-9A-Fa-f\\s]*";


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (!isSubmitted) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        pattern={pattern}
        className="w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-center text-xl font-mono tracking-wider"
        disabled={isSubmitted}
        aria-label={t('answerInputAria')}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isSubmitted || userInput.trim().length === 0}
        className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-150 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {t('submitButton')}
      </button>
    </form>
  );
};

export default AnswerInput;
