export const usNumber = new Intl.NumberFormat('en-US');

export function formatUSNumberString(number: string) {
  const [main, decimal] = number.split('.');
  const decimalNumber = decimal ? `.${decimal}` : '';

  return `${usNumber.format(BigInt(main))}${decimalNumber}`;
}
