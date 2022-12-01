const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

const convertMessage = ({ type, ...data }) => {
  console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
  return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};

const sendEvent = (req, res, { type, data }) => {
  res.write(convertMessage({ type: type, data: data }));
};

module.exports = {
  convertMessage,
  sendEvent,
  headers,
};
