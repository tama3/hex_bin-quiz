
export enum GameMode {
  HexToBin = 'hexToBin',
  BinToHex = 'binToHex',
}

export interface CurrentQuestion {
  decimalValue: number;
  hexValue: string;
  binaryValue: string;
}
