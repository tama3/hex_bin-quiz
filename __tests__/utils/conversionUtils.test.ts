import { describe, it, expect } from 'vitest';
import {
  generateRandomByte,
  decimalToHex,
  decimalToBinary,
  hexToDecimal,
  binaryToDecimal,
  isValidHexInput,
  isValidBinaryInput,
  formatBinaryString,
} from '../../utils/conversionUtils';

describe('conversionUtils', () => {
  describe('generateRandomByte', () => {
    it('should generate a number between 0 and 255', () => {
      for (let i = 0; i < 100; i++) {
        const result = generateRandomByte();
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(255);
        expect(Number.isInteger(result)).toBe(true);
      }
    });
  });

  describe('decimalToHex', () => {
    it('should convert decimal to 2-digit hex string', () => {
      expect(decimalToHex(0)).toBe('00');
      expect(decimalToHex(10)).toBe('0A');
      expect(decimalToHex(255)).toBe('FF');
      expect(decimalToHex(16)).toBe('10');
    });

    it('should handle single digit hex values', () => {
      expect(decimalToHex(1)).toBe('01');
      expect(decimalToHex(15)).toBe('0F');
    });
  });

  describe('decimalToBinary', () => {
    it('should convert decimal to 8-digit binary string', () => {
      expect(decimalToBinary(0)).toBe('00000000');
      expect(decimalToBinary(1)).toBe('00000001');
      expect(decimalToBinary(255)).toBe('11111111');
      expect(decimalToBinary(10)).toBe('00001010');
    });
  });

  describe('hexToDecimal', () => {
    it('should convert hex string to decimal', () => {
      expect(hexToDecimal('00')).toBe(0);
      expect(hexToDecimal('0A')).toBe(10);
      expect(hexToDecimal('FF')).toBe(255);
      expect(hexToDecimal('10')).toBe(16);
    });

    it('should handle lowercase hex strings', () => {
      expect(hexToDecimal('ff')).toBe(255);
      expect(hexToDecimal('0a')).toBe(10);
    });
  });

  describe('binaryToDecimal', () => {
    it('should convert binary string to decimal', () => {
      expect(binaryToDecimal('00000000')).toBe(0);
      expect(binaryToDecimal('00000001')).toBe(1);
      expect(binaryToDecimal('11111111')).toBe(255);
      expect(binaryToDecimal('00001010')).toBe(10);
    });
  });

  describe('isValidHexInput', () => {
    it('should return true for valid 2-digit hex strings', () => {
      expect(isValidHexInput('00')).toBe(true);
      expect(isValidHexInput('FF')).toBe(true);
      expect(isValidHexInput('0A')).toBe(true);
      expect(isValidHexInput('ff')).toBe(true);
    });

    it('should return false for invalid hex strings', () => {
      expect(isValidHexInput('')).toBe(false);
      expect(isValidHexInput('0')).toBe(false);
      expect(isValidHexInput('FFF')).toBe(false);
      expect(isValidHexInput('0G')).toBe(false);
      expect(isValidHexInput('12 34')).toBe(false);
    });
  });

  describe('isValidBinaryInput', () => {
    it('should return true for valid 8-digit binary strings', () => {
      expect(isValidBinaryInput('00000000')).toBe(true);
      expect(isValidBinaryInput('11111111')).toBe(true);
      expect(isValidBinaryInput('10101010')).toBe(true);
    });

    it('should return false for invalid binary strings', () => {
      expect(isValidBinaryInput('')).toBe(false);
      expect(isValidBinaryInput('0000000')).toBe(false);
      expect(isValidBinaryInput('000000000')).toBe(false);
      expect(isValidBinaryInput('00000002')).toBe(false);
      expect(isValidBinaryInput('0000 0000')).toBe(false);
    });
  });

  describe('formatBinaryString', () => {
    it('should format 8-digit binary string with space', () => {
      expect(formatBinaryString('00000000')).toBe('0000 0000');
      expect(formatBinaryString('11111111')).toBe('1111 1111');
      expect(formatBinaryString('10101010')).toBe('1010 1010');
    });

    it('should return original string if not 8 digits', () => {
      expect(formatBinaryString('')).toBe('');
      expect(formatBinaryString('0000')).toBe('0000');
      expect(formatBinaryString('000000000')).toBe('000000000');
    });
  });
}); 