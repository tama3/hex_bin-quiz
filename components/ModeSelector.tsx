import React from 'react';
import { GameMode } from '../types';
import { useLanguage } from '../contexts/LanguageContext'; // Added

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (newMode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const { t } = useLanguage(); // Added

  const modes = [
    { value: GameMode.HexToBin, labelKey: 'modeHexToBin' as const },
    { value: GameMode.BinToHex, labelKey: 'modeBinToHex' as const },
  ];

  return (
    <div className="mb-6 flex justify-center space-x-2 sm:space-x-4"> {/* Adjusted space for smaller screens */}
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-150 ease-in-out text-sm sm:text-base
            ${currentMode === mode.value
              ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-700 ring-offset-2 ring-offset-slate-100'
              : 'bg-white text-sky-700 hover:bg-sky-100 shadow'
            }`}
        >
          {t(mode.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
