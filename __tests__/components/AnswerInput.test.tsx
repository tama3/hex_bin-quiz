import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnswerInput from '../../components/AnswerInput';
import { GameMode } from '../../types';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock the useLanguage hook
vi.mock('../../contexts/LanguageContext', async () => {
  const actual = await vi.importActual('../../contexts/LanguageContext');
  return {
    ...actual,
    useLanguage: () => ({
      locale: 'ja',
      setLocale: vi.fn(),
      t: (key: string) => {
        const translations: Record<string, string> = {
          answerPlaceholderHexToBin: '例: 0101 1010',
          answerPlaceholderBinToHex: '例: 5A',
          submitButton: '確認',
          answerInputAria: '回答入力欄',
        };
        return translations[key] || key;
      },
    }),
  };
});

describe('AnswerInput', () => {
  const mockOnInputChange = vi.fn();
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnInputChange.mockClear();
    mockOnSubmit.mockClear();
  });

  describe('HexToBin mode', () => {
    const defaultProps = {
      mode: GameMode.HexToBin,
      userInput: '',
      onInputChange: mockOnInputChange,
      onSubmit: mockOnSubmit,
      isSubmitted: false,
    };

    it('renders input field and submit button', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '確認' })).toBeInTheDocument();
    });

    it('displays correct placeholder for HexToBin mode', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', '例: 0101 1010');
    });

    it('calls onInputChange when user types', async () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      await user.type(input, '01010101');

      // 各文字が順番に呼ばれることを確認
      expect(mockOnInputChange).toHaveBeenNthCalledWith(1, '0');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(2, '1');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(3, '0');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(4, '1');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(5, '0');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(6, '1');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(7, '0');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(8, '1');
      expect(mockOnInputChange).toHaveBeenCalledTimes(8);
    });

    it('calls onSubmit when form is submitted', async () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" />
        </LanguageProvider>
      );

      const form = screen.getByRole('textbox').closest('form');
      fireEvent.submit(form!);

      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('disables submit button when input is empty', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="" />
        </LanguageProvider>
      );

      const submitButton = screen.getByRole('button', { name: '確認' });
      expect(submitButton).toBeDisabled();
    });

    it('enables submit button when input has content', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" />
        </LanguageProvider>
      );

      const submitButton = screen.getByRole('button', { name: '確認' });
      expect(submitButton).not.toBeDisabled();
    });

    it('disables input and button when submitted', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" isSubmitted={true} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: '確認' });

      expect(input).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });

    it('does not call onSubmit when already submitted', async () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" isSubmitted={true} />
        </LanguageProvider>
      );

      const form = screen.getByRole('textbox').closest('form');
      fireEvent.submit(form!);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('has correct pattern attribute for binary input', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[01\\s]*');
    });

    it('has focusable elements', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: '確認' });

      // Check that elements are focusable
      expect(input).not.toHaveAttribute('tabindex', '-1');
      expect(submitButton).not.toHaveAttribute('tabindex', '-1');
      
      // Check that input is not disabled
      expect(input).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('BinToHex mode', () => {
    const defaultProps = {
      mode: GameMode.BinToHex,
      userInput: '',
      onInputChange: mockOnInputChange,
      onSubmit: mockOnSubmit,
      isSubmitted: false,
    };

    it('displays correct placeholder for BinToHex mode', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', '例: 5A');
    });

    it('has correct pattern attribute for hex input', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[0-9A-Fa-f\\s]*');
    });

    it('accepts hex input', async () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      await user.type(input, '5A');

      expect(mockOnInputChange).toHaveBeenNthCalledWith(1, '5');
      expect(mockOnInputChange).toHaveBeenNthCalledWith(2, 'A');
      expect(mockOnInputChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    const defaultProps = {
      mode: GameMode.HexToBin,
      userInput: '',
      onInputChange: mockOnInputChange,
      onSubmit: mockOnSubmit,
      isSubmitted: false,
    };

    it('has proper aria-label', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', '回答入力欄');
    });

    it('has autoComplete disabled', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('has focusable elements', () => {
      render(
        <LanguageProvider>
          <AnswerInput {...defaultProps} userInput="01010101" />
        </LanguageProvider>
      );

      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: '確認' });

      // Check that elements are focusable
      expect(input).not.toHaveAttribute('tabindex', '-1');
      expect(submitButton).not.toHaveAttribute('tabindex', '-1');
      
      // Check that input is not disabled
      expect(input).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Focus management', () => {
    it('focuses input when not submitted', async () => {
      render(
        <LanguageProvider>
          <AnswerInput
            mode={GameMode.HexToBin}
            userInput=""
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            isSubmitted={false}
          />
        </LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveFocus();
      });
    });

    it('does not focus input when submitted', async () => {
      render(
        <LanguageProvider>
          <AnswerInput
            mode={GameMode.HexToBin}
            userInput=""
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            isSubmitted={true}
          />
        </LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByRole('textbox')).not.toHaveFocus();
      });
    });
  });
}); 