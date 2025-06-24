
// 0-255のランダムな整数を生成
export const generateRandomByte = (): number => {
  return Math.floor(Math.random() * 256);
};

// 10進数を2桁の16進数文字列に変換 (例: 10 -> "0A")
export const decimalToHex = (decimal: number): string => {
  const hex = decimal.toString(16).toUpperCase();
  return hex.length === 1 ? '0' + hex : hex;
};

// 10進数を8桁の2進数文字列に変換 (例: 10 -> "00001010")
export const decimalToBinary = (decimal: number): string => {
  return decimal.toString(2).padStart(8, '0');
};

// 16進数文字列を10進数に変換
export const hexToDecimal = (hex: string): number => {
  return parseInt(hex, 16);
};

// 2進数文字列を10進数に変換
export const binaryToDecimal = (binary: string): number => {
  return parseInt(binary, 2);
};

// 有効な16進数文字列かチェック (2文字、0-9, A-F)
export const isValidHexInput = (input: string): boolean => {
  return /^[0-9A-Fa-f]{2}$/.test(input);
};

// 有効な2進数文字列かチェック (8文字、0-1)
export const isValidBinaryInput = (input: string): boolean => {
  return /^[01]{8}$/.test(input);
};

// 8桁の2進数文字列を "XXXX XXXX" 形式にフォーマット
export const formatBinaryString = (binary: string): string => {
  if (binary && binary.length === 8) {
    return `${binary.substring(0, 4)} ${binary.substring(4, 8)}`;
  }
  return binary; // 元の形式のまま返す (通常は8桁のはず)
};
