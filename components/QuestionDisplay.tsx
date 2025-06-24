import React from 'react';
import { GameMode, CurrentQuestion } from '../types';
import { formatBinaryString } from '../utils/conversionUtils';
import { useLanguage } from '../contexts/LanguageContext'; // Added

interface QuestionDisplayProps {
  mode: GameMode;
  question: CurrentQuestion | null;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ mode, question }) => {
  const { t } = useLanguage(); // Added

  if (!question) {
    return <p className="text-center text-gray-600">{t('questionLoading')}</p>;
  }

  const questionValueText = mode === GameMode.HexToBin 
    ? question.hexValue 
    : formatBinaryString(question.binaryValue);
  
  const questionTypeKey = mode === GameMode.HexToBin ? 'questionTypeHex' : 'questionTypeBin';
  const targetTypeKey = mode === GameMode.HexToBin ? 'targetTypeBin' : 'targetTypeHex';

  const questionTypeText = t(questionTypeKey);
  const targetTypeText = t(targetTypeKey);

  return (
    <div className="mb-6 p-6 bg-white rounded-xl shadow-lg text-center">
      <p className="text-lg text-gray-700 mb-2">
        {t('questionPrompt', questionTypeText, targetTypeText)}
      </p>
      <p className="text-4xl font-mono font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-md inline-block tracking-wider">
        {questionValueText}
      </p>
    </div>
  );
};

export default QuestionDisplay;
