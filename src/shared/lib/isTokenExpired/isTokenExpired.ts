export const isTokenExpired = (exp:   number) => {
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
};