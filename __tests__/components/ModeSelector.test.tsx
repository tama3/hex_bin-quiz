import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModeSelector from '../../components/ModeSelector';
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
          modeHexToBin: '16進数 → 2進数',
          modeBinToHex: '2進数 → 16進数',
        };
        return translations[key] || key;
      },
    }),
  };
});

describe('ModeSelector', () => {
  const mockOnModeChange = vi.fn();

  beforeEach(() => {
    mockOnModeChange.mockClear();
  });

  it('renders both mode buttons', () => {
    render(
      <LanguageProvider>
        <ModeSelector currentMode={GameMode.HexToBin} onModeChange={mockOnModeChange} />
      </LanguageProvider>
    );

    expect(screen.getByText('16進数 → 2進数')).toBeInTheDocument();
    expect(screen.getByText('2進数 → 16進数')).toBeInTheDocument();
  });

  it('highlights current mode button', () => {
    render(
      <LanguageProvider>
        <ModeSelector currentMode={GameMode.HexToBin} onModeChange={mockOnModeChange} />
      </LanguageProvider>
    );

    const hexToBinButton = screen.getByText('16進数 → 2進数');
    const binToHexButton = screen.getByText('2進数 → 16進数');

    expect(hexToBinButton.closest('button')).toHaveClass('bg-sky-600');
    expect(binToHexButton.closest('button')).toHaveClass('bg-white');
  });

  it('calls onModeChange when button is clicked', () => {
    render(
      <LanguageProvider>
        <ModeSelector currentMode={GameMode.HexToBin} onModeChange={mockOnModeChange} />
      </LanguageProvider>
    );

    const binToHexButton = screen.getByText('2進数 → 16進数');
    fireEvent.click(binToHexButton);

    expect(mockOnModeChange).toHaveBeenCalledWith(GameMode.BinToHex);
  });

  it('updates highlighted button when mode changes', () => {
    const { rerender } = render(
      <LanguageProvider>
        <ModeSelector currentMode={GameMode.HexToBin} onModeChange={mockOnModeChange} />
      </LanguageProvider>
    );

    rerender(
      <LanguageProvider>
        <ModeSelector currentMode={GameMode.BinToHex} onModeChange={mockOnModeChange} />
      </LanguageProvider>
    );

    const hexToBinButton = screen.getByText('16進数 → 2進数');
    const binToHexButton = screen.getByText('2進数 → 16進数');

    expect(hexToBinButton.closest('button')).toHaveClass('bg-white');
    expect(binToHexButton.closest('button')).toHaveClass('bg-sky-600');
  });
}); 