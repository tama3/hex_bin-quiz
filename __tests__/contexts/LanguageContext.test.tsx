import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'ja',
  writable: true,
});

// Test component to access context
const TestComponent = () => {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale('en')}>Change to English</button>
      <span data-testid="app-name">{t('appName')}</span>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default Japanese locale when no stored preference', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('ja');
  });

  it('loads stored locale from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('quizAppLocale');
  });

  it('saves locale to localStorage when changed', () => {
    localStorageMock.getItem.mockReturnValue('ja');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const changeButton = screen.getByText('Change to English');
    fireEvent.click(changeButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('quizAppLocale', 'en');
  });

  it('translates text based on current locale', () => {
    localStorageMock.getItem.mockReturnValue('ja');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('app-name')).toHaveTextContent('進数変換クイズ');
  });

  it('handles browser language detection', () => {
    localStorageMock.getItem.mockReturnValue(null);
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true,
    });
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('falls back to Japanese for unsupported browser language', () => {
    localStorageMock.getItem.mockReturnValue(null);
    Object.defineProperty(navigator, 'language', {
      value: 'fr',
      writable: true,
    });
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('ja');
  });
}); 