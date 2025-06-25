import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionDisplay from '../../components/QuestionDisplay';
import { GameMode, CurrentQuestion } from '../../types';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock the useLanguage hook
vi.mock('../../contexts/LanguageContext', async () => {
  const actual = await vi.importActual('../../contexts/LanguageContext');
  return {
    ...actual,
    useLanguage: () => ({
      locale: 'ja',
      setLocale: vi.fn(),
      t: (key: string, ...args: string[]) => {
        const translations: Record<string, string | ((...args: string[]) => string)> = {
          questionLoading: '問題読み込み中...',
          questionTypeHex: '16進数',
          questionTypeBin: '2進数',
          targetTypeHex: '2桁の16進数',
          targetTypeBin: '8桁の2進数',
          questionPrompt: (questionType: string, targetType: string) => 
            `以下の${questionType}を${targetType}に変換してください:`,
        };
        const translation = translations[key];
        if (typeof translation === 'function') {
          return translation(...args);
        }
        return translation || key;
      },
    }),
  };
});

describe('QuestionDisplay', () => {
  const mockQuestion: CurrentQuestion = {
    decimalValue: 85,
    hexValue: '55',
    binaryValue: '01010101',
  };

  describe('when question is null', () => {
    it('displays loading message', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={null} />
        </LanguageProvider>
      );

      expect(screen.getByText('問題読み込み中...')).toBeInTheDocument();
    });
  });

  describe('HexToBin mode', () => {
    it('displays hex value as question', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      expect(screen.getByText('55')).toBeInTheDocument();
    });

    it('displays correct question prompt for HexToBin', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      expect(screen.getByText('以下の16進数を8桁の2進数に変換してください:')).toBeInTheDocument();
    });

    it('applies correct styling to question value', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const questionValue = screen.getByText('55');
      expect(questionValue).toHaveClass('text-4xl', 'font-mono', 'font-bold', 'text-indigo-600');
    });
  });

  describe('BinToHex mode', () => {
    it('displays formatted binary value as question', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.BinToHex} question={mockQuestion} />
        </LanguageProvider>
      );

      // formatBinaryString should format "01010101" to "0101 0101"
      expect(screen.getByText('0101 0101')).toBeInTheDocument();
    });

    it('displays correct question prompt for BinToHex', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.BinToHex} question={mockQuestion} />
        </LanguageProvider>
      );

      expect(screen.getByText('以下の2進数を2桁の16進数に変換してください:')).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('renders with correct container styling', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const container = screen.getByText('以下の16進数を8桁の2進数に変換してください:').closest('div');
      expect(container).toHaveClass('mb-6', 'p-6', 'bg-white', 'rounded-xl', 'shadow-lg', 'text-center');
    });

    it('renders question prompt with correct styling', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const prompt = screen.getByText('以下の16進数を8桁の2進数に変換してください:');
      expect(prompt).toHaveClass('text-lg', 'text-gray-700', 'mb-2');
    });

    it('renders question value with correct styling', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const questionValue = screen.getByText('55');
      expect(questionValue).toHaveClass(
        'text-4xl',
        'font-mono',
        'font-bold',
        'text-indigo-600',
        'bg-indigo-50',
        'px-4',
        'py-2',
        'rounded-md',
        'inline-block',
        'tracking-wider'
      );
    });
  });

  describe('edge cases', () => {
    it('handles question with zero values', () => {
      const zeroQuestion: CurrentQuestion = {
        decimalValue: 0,
        hexValue: '00',
        binaryValue: '00000000',
      };

      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={zeroQuestion} />
        </LanguageProvider>
      );

      expect(screen.getByText('00')).toBeInTheDocument();
    });

    it('handles question with maximum values', () => {
      const maxQuestion: CurrentQuestion = {
        decimalValue: 255,
        hexValue: 'FF',
        binaryValue: '11111111',
      };

      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.BinToHex} question={maxQuestion} />
        </LanguageProvider>
      );

      expect(screen.getByText('1111 1111')).toBeInTheDocument();
    });

    it('handles binary values that need formatting', () => {
      const questionWithSpaces: CurrentQuestion = {
        decimalValue: 170,
        hexValue: 'AA',
        binaryValue: '10101010',
      };

      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.BinToHex} question={questionWithSpaces} />
        </LanguageProvider>
      );

      expect(screen.getByText('1010 1010')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has semantic structure with paragraphs', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const paragraphs = screen.getAllByText(/.*/);
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('displays question value prominently', () => {
      render(
        <LanguageProvider>
          <QuestionDisplay mode={GameMode.HexToBin} question={mockQuestion} />
        </LanguageProvider>
      );

      const questionValue = screen.getByText('55');
      expect(questionValue).toBeInTheDocument();
      expect(questionValue).toHaveClass('text-4xl'); // Large, prominent text
    });
  });
}); 