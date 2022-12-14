const event = { type: "notification", data: { titre: "", message: "" } };
const connection = new Set();
const { sendEvent, convertMessage } = require("../sse");

const getNotification = (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  connection.add(res);
  res.write(": \n\n");
  const interval = setInterval(() => {
    res.write(
      convertMessage({
        type: "nb-connexion",
        nbConnexion: connection.size,
      })
    );
    res.flush();
  }, 5000);

  res.on("close", () => {
    console.log("sse connection closed");
    clearInterval(interval);
    connection.delete(res);
    res.end();
  });
  next();
};

const postNotification = (req, res, next) => {
  const data = req.body;
  try {
    if (data.status === "created" && (!data.message || !data.titre))
      return res.status(401).json({ message: "Message and titre requis" });

    event.data = data;
    res.status(201).end();
    sendEvent(event, connection);

    // SseHelpers.sendEvent(req, res, event);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Une erreur est survenue" });
  }

  // console.error(error);
};

module.exports = {
  postNotification,
  getNotification,
};
