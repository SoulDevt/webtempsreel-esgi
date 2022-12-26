export const isTokenExpired = (tokenSeconds) => {
  const currentTime = new Date() / 1000;
  return tokenSeconds < currentTime.getMilliseconds();
};

export async function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
