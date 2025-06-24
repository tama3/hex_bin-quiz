export type Locale = 'ja' | 'en' | 'zh-CN' | 'ko';

export interface TranslationSet {
  appName: string;
  appSubtitle: string;
  modeHexToBin: string;
  modeBinToHex: string;
  scoreTitle: string;
  accuracy: string;
  questionPrompt: (questionType: string, targetType: string) => string;
  questionTypeHex: string;
  questionTypeBin: string;
  targetTypeHex: string;
  targetTypeBin: string;
  questionLoading: string;
  answerPlaceholderHexToBin: string;
  answerPlaceholderBinToHex: string;
  submitButton: string;
  feedbackCorrect: string;
  feedbackIncorrect: (correctAnswer: string) => string;
  feedbackInvalidFormat: (format: string) => string;
  feedbackEmptyInput: string;
  nextQuestionButton: string;
  nextQuestionButtonAria: string;
  footerText: (year: number) => string;
  answerInputAria: string;
  languageSelectorLabel: string;
}

export const translations: Record<Locale, TranslationSet> = {
  ja: {
    appName: '進数変換クイズ',
    appSubtitle: '16進数と2進数の変換をマスターしよう！',
    modeHexToBin: '16進数 → 2進数',
    modeBinToHex: '2進数 → 16進数',
    scoreTitle: 'スコア',
    accuracy: '正解率',
    questionPrompt: (questionType, targetType) => `以下の${questionType}を${targetType}に変換してください:`,
    questionTypeHex: '16進数',
    questionTypeBin: '2進数',
    targetTypeHex: '2桁の16進数',
    targetTypeBin: '8桁の2進数',
    questionLoading: '問題読み込み中...',
    answerPlaceholderHexToBin: '例: 0101 1010',
    answerPlaceholderBinToHex: '例: 5A',
    submitButton: '確認',
    feedbackCorrect: '正解！素晴らしい！',
    feedbackIncorrect: (correctAnswer) => `不正解。正解は: ${correctAnswer}`,
    feedbackInvalidFormat: (format) => `無効な入力です。${format}で入力してください。`,
    feedbackEmptyInput: '答えを入力してください。',
    nextQuestionButton: '次の問題へ',
    nextQuestionButtonAria: '次の問題へ (Nキーでも可)',
    footerText: (year) => `© ${year} 進数変換クイズ`,
    answerInputAria: '回答入力欄',
    languageSelectorLabel: 'Language:',
  },
  en: {
    appName: 'Numeral System Quiz',
    appSubtitle: 'Master Hexadecimal and Binary conversions!',
    modeHexToBin: 'Hex → Bin',
    modeBinToHex: 'Bin → Hex',
    scoreTitle: 'Score',
    accuracy: 'Accuracy',
    questionPrompt: (questionType, targetType) => `Convert the following ${questionType} to ${targetType}:`,
    questionTypeHex: 'hexadecimal number',
    questionTypeBin: 'binary number',
    targetTypeHex: 'a 2-digit hexadecimal number',
    targetTypeBin: 'an 8-digit binary number',
    questionLoading: 'Loading question...',
    answerPlaceholderHexToBin: 'e.g., 0101 1010',
    answerPlaceholderBinToHex: 'e.g., 5A',
    submitButton: 'Submit',
    feedbackCorrect: 'Correct! Great job!',
    feedbackIncorrect: (correctAnswer) => `Incorrect. The correct answer is: ${correctAnswer}`,
    feedbackInvalidFormat: (format) => `Invalid input. Please enter ${format}.`,
    feedbackEmptyInput: 'Please enter an answer.',
    nextQuestionButton: 'Next Question',
    nextQuestionButtonAria: 'Next Question (N key also works)',
    footerText: (year) => `© ${year} Numeral System Quiz`,
    answerInputAria: 'Answer input field',
    languageSelectorLabel: 'Language:',
  },
  'zh-CN': {
    appName: '进制转换测验',
    appSubtitle: '掌握十六进制和二进制的转换！',
    modeHexToBin: '十六进制 → 二进制',
    modeBinToHex: '二进制 → 十六进制',
    scoreTitle: '得分',
    accuracy: '准确率',
    questionPrompt: (questionType, targetType) => `请将以下${questionType}转换为${targetType}:`,
    questionTypeHex: '十六进制数',
    questionTypeBin: '二进制数',
    targetTypeHex: '一个2位十六进制数',
    targetTypeBin: '一个8位二进制数',
    questionLoading: '正在加载问题...',
    answerPlaceholderHexToBin: '例如: 0101 1010',
    answerPlaceholderBinToHex: '例如: 5A',
    submitButton: '确认',
    feedbackCorrect: '正确！太棒了！',
    feedbackIncorrect: (correctAnswer) => `错误。正确答案是: ${correctAnswer}`,
    feedbackInvalidFormat: (format) => `无效输入。请输入${format}。`,
    feedbackEmptyInput: '请输入答案。',
    nextQuestionButton: '下一题',
    nextQuestionButtonAria: '下一题 (N键也可以)',
    footerText: (year) => `© ${year} 进制转换测验`,
    answerInputAria: '答案输入框',
    languageSelectorLabel: 'Language:',
  },
  ko: {
    appName: '진수 변환 퀴즈',
    appSubtitle: '16진수와 2진수 변환을 마스터하세요!',
    modeHexToBin: '16진수 → 2진수',
    modeBinToHex: '2진수 → 16진수',
    scoreTitle: '점수',
    accuracy: '정확도',
    questionPrompt: (questionType, targetType) => `다음 ${questionType}를 ${targetType}로 변환하세요:`,
    questionTypeHex: '16진수',
    questionTypeBin: '2진수',
    targetTypeHex: '2자리 16진수',
    targetTypeBin: '8자리 2진수',
    questionLoading: '문제 로딩 중...',
    answerPlaceholderHexToBin: '예: 0101 1010',
    answerPlaceholderBinToHex: '예: 5A',
    submitButton: '확인',
    feedbackCorrect: '정답입니다! 훌륭해요!',
    feedbackIncorrect: (correctAnswer) => `오답입니다. 정답은: ${correctAnswer} 입니다.`,
    feedbackInvalidFormat: (format) => `잘못된 입력입니다. ${format} 형식으로 입력해주세요.`,
    feedbackEmptyInput: '답을 입력해주세요.',
    nextQuestionButton: '다음 문제',
    nextQuestionButtonAria: '다음 문제 (N키로도 가능)',
    footerText: (year) => `© ${year} 진수 변환 퀴즈`,
    answerInputAria: '답변 입력 필드',
    languageSelectorLabel: 'Language:',
  },
};
