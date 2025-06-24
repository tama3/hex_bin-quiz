
import React from 'react';

interface FeedbackDisplayProps {
  feedback: string | null;
  isCorrect: boolean | null;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isCorrect }) => {
  if (!feedback) {
    return null;
  }

  const baseClasses = "p-4 rounded-lg text-center font-semibold text-lg mb-4 shadow";
  const successClasses = "bg-green-100 text-green-700";
  const errorClasses = "bg-red-100 text-red-700";
  const infoClasses = "bg-yellow-100 text-yellow-700"; // For invalid input

  let  dynamicClasses = infoClasses; // Default to info for general messages like invalid input
  if (isCorrect === true) {
    dynamicClasses = successClasses;
  } else if (isCorrect === false) {
    dynamicClasses = errorClasses;
  }


  return (
    <div className={`${baseClasses} ${dynamicClasses}`}>
      {feedback}
    </div>
  );
};

export default FeedbackDisplay;
