export const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().split('T')[0];
};