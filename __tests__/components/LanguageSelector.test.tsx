import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '../../components/LanguageSelector';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';

// Mock the useLanguage hook
vi.mock('../../contexts/LanguageContext', async () => {
  const actual = await vi.importActual('../../contexts/LanguageContext');
  return {
    ...actual,
    useLanguage: vi.fn(() => ({
      locale: 'ja',
      setLocale: vi.fn(),
      t: (key: string) => {
        const translations: Record<string, string> = {
          languageSelectorLabel: 'Language:',
        };
        return translations[key] || key;
      },
    })),
  };
});

describe('LanguageSelector', () => {
  it('renders language selector with label', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all supported languages', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('ja');
    
    // Check that all language options are present
    expect(screen.getByText('日本語')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('简体中文')).toBeInTheDocument();
    expect(screen.getByText('한국어')).toBeInTheDocument();
    expect(screen.getByText('ไทย')).toBeInTheDocument();
  });

  it('calls setLocale when language is changed', () => {
    const mockSetLocale = vi.fn();
    
    vi.mocked(useLanguage).mockReturnValue({
      locale: 'ja',
      setLocale: mockSetLocale,
      t: (key: string) => key === 'languageSelectorLabel' ? 'Language:' : key,
    });

    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en' } });

    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });
}); 