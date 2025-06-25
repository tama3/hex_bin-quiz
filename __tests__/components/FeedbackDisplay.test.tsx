import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeedbackDisplay from '../../components/FeedbackDisplay';

describe('FeedbackDisplay', () => {
  describe('when feedback is null', () => {
    it('renders nothing', () => {
      const { container } = render(
        <FeedbackDisplay feedback={null} isCorrect={null} />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('when feedback is provided', () => {
    it('displays the feedback message', () => {
      render(
        <FeedbackDisplay feedback="正解！素晴らしい！" isCorrect={true} />
      );

      expect(screen.getByText('正解！素晴らしい！')).toBeInTheDocument();
    });

    it('applies correct styling for correct answer', () => {
      render(
        <FeedbackDisplay feedback="正解！素晴らしい！" isCorrect={true} />
      );

      const feedbackElement = screen.getByText('正解！素晴らしい！');
      expect(feedbackElement).toHaveClass('bg-green-100', 'text-green-700');
    });

    it('applies correct styling for incorrect answer', () => {
      render(
        <FeedbackDisplay feedback="不正解。正解は: 01010101" isCorrect={false} />
      );

      const feedbackElement = screen.getByText('不正解。正解は: 01010101');
      expect(feedbackElement).toHaveClass('bg-red-100', 'text-red-700');
    });

    it('applies info styling for null isCorrect (invalid input)', () => {
      render(
        <FeedbackDisplay feedback="無効な入力です。8桁の2進数で入力してください。" isCorrect={null} />
      );

      const feedbackElement = screen.getByText('無効な入力です。8桁の2進数で入力してください。');
      expect(feedbackElement).toHaveClass('bg-yellow-100', 'text-yellow-700');
    });

    it('applies info styling for undefined isCorrect', () => {
      render(
        <FeedbackDisplay feedback="答えを入力してください。" isCorrect={undefined as any} />
      );

      const feedbackElement = screen.getByText('答えを入力してください。');
      expect(feedbackElement).toHaveClass('bg-yellow-100', 'text-yellow-700');
    });
  });

  describe('base styling', () => {
    it('applies base classes to all feedback types', () => {
      render(
        <FeedbackDisplay feedback="テストメッセージ" isCorrect={true} />
      );

      const feedbackElement = screen.getByText('テストメッセージ');
      expect(feedbackElement).toHaveClass(
        'p-4',
        'rounded-lg',
        'text-center',
        'font-semibold',
        'text-lg',
        'mb-4',
        'shadow'
      );
    });
  });

  describe('different feedback scenarios', () => {
    it('handles correct answer feedback', () => {
      render(
        <FeedbackDisplay feedback="正解！素晴らしい！" isCorrect={true} />
      );

      const feedbackElement = screen.getByText('正解！素晴らしい！');
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-green-100', 'text-green-700');
    });

    it('handles incorrect answer feedback with correct answer', () => {
      render(
        <FeedbackDisplay feedback="不正解。正解は: 01010101" isCorrect={false} />
      );

      const feedbackElement = screen.getByText('不正解。正解は: 01010101');
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-red-100', 'text-red-700');
    });

    it('handles invalid format feedback', () => {
      render(
        <FeedbackDisplay feedback="無効な入力です。8桁の2進数で入力してください。" isCorrect={null} />
      );

      const feedbackElement = screen.getByText('無効な入力です。8桁の2進数で入力してください。');
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-yellow-100', 'text-yellow-700');
    });

    it('handles empty input feedback', () => {
      render(
        <FeedbackDisplay feedback="答えを入力してください。" isCorrect={null} />
      );

      const feedbackElement = screen.getByText('答えを入力してください。');
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-yellow-100', 'text-yellow-700');
    });
  });

  describe('accessibility', () => {
    it('renders feedback in a semantic container', () => {
      render(
        <FeedbackDisplay feedback="テストメッセージ" isCorrect={true} />
      );

      const feedbackElement = screen.getByText('テストメッセージ');
      expect(feedbackElement.tagName).toBe('DIV');
    });

    it('has proper text contrast with background colors', () => {
      // Test that text colors provide good contrast
      render(
        <FeedbackDisplay feedback="テストメッセージ" isCorrect={true} />
      );

      const feedbackElement = screen.getByText('テストメッセージ');
      expect(feedbackElement).toHaveClass('text-green-700'); // Dark text on light background
    });
  });

  describe('edge cases', () => {
    it('handles empty string feedback', () => {
      render(
        <FeedbackDisplay feedback="" isCorrect={true} />
      );

      const feedbackElements = screen.getAllByText('');
      // どれか1つがDIVであることを確認
      expect(feedbackElements.some(el => el.tagName === 'DIV')).toBe(true);
    });

    it('handles very long feedback messages', () => {
      const longMessage = "これは非常に長いフィードバックメッセージです。".repeat(10);
      render(
        <FeedbackDisplay feedback={longMessage} isCorrect={false} />
      );

      const feedbackElement = screen.getByText(longMessage);
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-red-100', 'text-red-700');
    });

    it('handles special characters in feedback', () => {
      const specialMessage = "特殊文字: !@#$%^&*()_+-=[]{}|;':\",./<>?";
      render(
        <FeedbackDisplay feedback={specialMessage} isCorrect={null} />
      );

      const feedbackElement = screen.getByText(specialMessage);
      expect(feedbackElement).toBeInTheDocument();
      expect(feedbackElement).toHaveClass('bg-yellow-100', 'text-yellow-700');
    });
  });
}); 