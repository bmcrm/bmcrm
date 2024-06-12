export const createSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-zа-яіїєё0-9\s-]/gi, '')
    .replace(/\s+/gi, '-');
};
