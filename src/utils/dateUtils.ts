export const getCurrentIsoDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};
