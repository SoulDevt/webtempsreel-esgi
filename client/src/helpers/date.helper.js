export const isTokenExpired = (tokenSeconds) => {
  const currentTime = new Date();
  return tokenSeconds < currentTime.getMilliseconds();
};