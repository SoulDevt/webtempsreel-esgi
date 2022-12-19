export const writingMessageBot = ({ message }) => {
  let showMessage = 'Typing...';
  setTimeout(() => {
    showMessage = message;
  }, 2000);
  return showMessage;
};

export const endMessage = ["J'espère vous êtes satisfait de votre demande.", 'Bonne journée !'];
