export const getCurrentIsoDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

export const getIsoDateFromUnixMs = (unixMs: number) => {
  const date = new Date(unixMs);
  return date.toISOString();
};
