export const writingMessageBot = ({ message }) => {
  let showMessage = 'Typing...';
  setTimeout(() => {
    showMessage = message;
  }, 2000);
  return showMessage;
};
