export const isTokenExpired = (tokenSeconds) => {
    const currentTime = Date.now() / 1000;
    return tokenSeconds < currentTime;
};