const event = { type: "notification" };
const { SseHelpers } = require("../helpers");

const getNotification = (req, res) => {
  res.writeHead(200, SseHelpers.headers);
  
  const eventInterval = setInterval(() => {
    SseHelpers.sendEvent(req, res, event);
  }, 5000);

  // SseHelpers.sendEvent(req, res, toto);
  req.on("close", (err) => {
    clearInterval(eventInterval);
  });
};

const postNotification = async (req, res, next) => {
  console.log("update notification", req.body);
  const { titre, message } = req.body;
  event.data = { titre, message, status: "new" };
};

module.exports = {
  getNotification,
  postNotification,
};
