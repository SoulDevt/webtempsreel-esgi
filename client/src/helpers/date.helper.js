export const isTokenExpired = (tokenSeconds) => {
  const currentTime = Date.now() / 1000;
  return tokenSeconds < currentTime;
};

export async function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
