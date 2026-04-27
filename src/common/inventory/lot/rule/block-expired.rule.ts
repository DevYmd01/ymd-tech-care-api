export function blockExpiredRule<
  T extends { lot: { expiry_date: Date | null } },
>(lots: T[]): T[] {
  const today = new Date();

  return lots.filter((row) => {
    if (!row.lot.expiry_date) return true;

    return new Date(row.lot.expiry_date) > today;
  });
}