const { Router } = require("express");
const router = new Router();
const { EventEmitter } = require("events");
const { SseHelpers } = require("../helpers");

const emitter = new EventEmitter();

const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

let counter = 0;
router.get("/test", async (req, res) => {
  res.writeHead(200, headers);

  const eventInterval = setInterval(() => {
    counter += 1;
    res.write(SseHelpers.convertMessage({ type: "test", counter }));
  }, 5000);
  
  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

module.exports = router;
