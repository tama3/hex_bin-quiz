import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Added

interface ScoreDisplayProps {
  score: number;
  questionsAttempted: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, questionsAttempted }) => {
  const { t } = useLanguage(); // Added
  const accuracyValue = questionsAttempted > 0 ? ((score / questionsAttempted) * 100).toFixed(1) : "---";
  
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow-lg text-center">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('scoreTitle')}</h3>
      <p className="text-3xl font-bold text-sky-600">
        {score} / {questionsAttempted}
      </p>
      <p className="text-md text-gray-500 mt-1">
        {t('accuracy')}: {accuracyValue}%
      </p>
    </div>
  );
};

export default ScoreDisplay;
