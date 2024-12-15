export const generateEAN13 = (code: string): string => {
  // Pad the code with zeros to make it 12 digits
  const paddedCode = code.padStart(12, '0');
  
  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(paddedCode[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return paddedCode + checkDigit;
};