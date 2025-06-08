export const truncateText = (text, maxLength = 32) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
};
