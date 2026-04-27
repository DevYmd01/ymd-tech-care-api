export function fifoRule<T extends { lot: { mfg_date: Date | null } }>(
  lots: T[],
): T[] {
  return [...lots].sort((a, b) => {
    const dateA = a.lot.mfg_date
      ? new Date(a.lot.mfg_date).getTime()
      : 0;

    const dateB = b.lot.mfg_date
      ? new Date(b.lot.mfg_date).getTime()
      : 0;

    return dateA - dateB;
  });
}