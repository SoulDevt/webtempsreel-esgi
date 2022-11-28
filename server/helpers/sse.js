const convertMessage = ({ type, ...data }) => {
  console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
  return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};

// const writeEvent = (res, sseId, data) => {
//   res.write(`event: ${sseId}\n`);
//   res.write(`data: ${data}\n\n`);
// };

// export const sendEvent = (_req, res, interval = 2000) => {
//   res.writeHead(200, {
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//   });

//   const sseId = new Date().toDateString();

//   setInterval(() => {
//     writeEvent(res, sseId, JSON.stringify(donation));
//   }, interval);

//   writeEvent(res, sseId, JSON.stringify(donation));
// };

module.exports = {
  convertMessage
};
