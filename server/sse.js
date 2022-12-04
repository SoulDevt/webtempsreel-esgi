let currentId = 0;

const convertMessage = ({ type, ...data }) => {
  console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
  const message =
    `id: ${currentId}\n` +
    `event: ${type}\n` +
    `data: ${JSON.stringify(data)}\n\n`;
  currentId++;
  return message;
};

const sendEvent = ({ type, data }, connexionList) => {
  for (let connexion of connexionList) {
    connexion.write(convertMessage({ type: type, data: data }));
    connexion.flush();
  }
};

module.exports = { sendEvent };
