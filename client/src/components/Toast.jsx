const Toast = ({ titre, message }) => {
  return (
    <div id="toast-notification" role="alert">
      <p>{titre}</p>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
