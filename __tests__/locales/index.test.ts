import { describe, it, expect } from 'vitest';
import { translations, Locale } from '../../locales';

describe('translations', () => {
  const locales: Locale[] = ['ja', 'en', 'zh-CN', 'ko'];

  it('should have all required locales', () => {
    locales.forEach(locale => {
      expect(translations[locale]).toBeDefined();
    });
  });

  it('should have all required translation keys for each locale', () => {
    const requiredKeys = [
      'appName',
      'appSubtitle',
      'modeHexToBin',
      'modeBinToHex',
      'scoreTitle',
      'accuracy',
      'questionTypeHex',
      'questionTypeBin',
      'targetTypeHex',
      'targetTypeBin',
      'questionLoading',
      'answerPlaceholderHexToBin',
      'answerPlaceholderBinToHex',
      'submitButton',
      'feedbackCorrect',
      'feedbackEmptyInput',
      'nextQuestionButton',
      'nextQuestionButtonAria',
      'answerInputAria',
      'languageSelectorLabel',
    ];

    locales.forEach(locale => {
      requiredKeys.forEach(key => {
        expect(translations[locale][key as keyof typeof translations[typeof locale]]).toBeDefined();
      });
    });
  });

  it('should have function translations for dynamic content', () => {
    locales.forEach(locale => {
      expect(typeof translations[locale].questionPrompt).toBe('function');
      expect(typeof translations[locale].feedbackIncorrect).toBe('function');
      expect(typeof translations[locale].feedbackInvalidFormat).toBe('function');
      expect(typeof translations[locale].footerText).toBe('function');
    });
  });

  it('should generate correct question prompts', () => {
    const jaPrompt = translations.ja.questionPrompt('16進数', '8桁の2進数');
    expect(jaPrompt).toBe('以下の16進数を8桁の2進数に変換してください:');
    
    const enPrompt = translations.en.questionPrompt('hexadecimal number', 'an 8-digit binary number');
    expect(enPrompt).toBe('Convert the following hexadecimal number to an 8-digit binary number:');
  });

  it('should generate correct feedback messages', () => {
    const jaFeedback = translations.ja.feedbackIncorrect('01010101');
    expect(jaFeedback).toBe('不正解。正解は: 01010101');
    
    const enFeedback = translations.en.feedbackIncorrect('01010101');
    expect(enFeedback).toBe('Incorrect. The correct answer is: 01010101');
  });

  it('should generate correct footer text', () => {
    const currentYear = new Date().getFullYear();
    const jaFooter = translations.ja.footerText(currentYear);
    expect(jaFooter).toBe(`© ${currentYear} 進数変換クイズ`);
    
    const enFooter = translations.en.footerText(currentYear);
    expect(enFooter).toBe(`© ${currentYear} Numeral System Quiz`);
  });

  it('should have consistent app names across locales', () => {
    expect(translations.ja.appName).toBe('進数変換クイズ');
    expect(translations.en.appName).toBe('Numeral System Quiz');
    expect(translations['zh-CN'].appName).toBe('进制转换测验');
    expect(translations.ko.appName).toBe('진수 변환 퀴즈');
  });

  it('should have valid mode labels', () => {
    locales.forEach(locale => {
      const hexToBin = translations[locale].modeHexToBin;
      const binToHex = translations[locale].modeBinToHex;
      
      expect(hexToBin).toBeTruthy();
      expect(binToHex).toBeTruthy();
      expect(typeof hexToBin).toBe('string');
      expect(typeof binToHex).toBe('string');
    });
  });
}); 