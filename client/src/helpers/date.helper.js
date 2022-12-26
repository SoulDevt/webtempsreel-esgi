export const isTokenExpired = (tokenSeconds) => {
  const currentTime = new Date() / 1000;
  return tokenSeconds < currentTime.getMilliseconds();
};