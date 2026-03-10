export function parseDiscountRaw(input?: string) {
  if (!input) return { type: 'NONE' as const };

  const raw = input.trim();

  if (raw.endsWith('%')) {
    const value = Number(raw.replace('%', ''));

    if (isNaN(value)) {
      throw new Error('Invalid discount rate');
    }

    return {
      type: 'RATE' as const,
      rate: value / 100,
    };
  }

  const amount = Number(raw);

  if (isNaN(amount)) {
    throw new Error('Invalid discount amount');
  }

  return {
    type: 'AMOUNT' as const,
    amount,
  };
}