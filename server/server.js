require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const EventEmitter = require("events");
const mainRouter = require("./routes");

// const notificationEvent = new EventEmitter();
const app = express();
app.use(cors());
app.use(mainRouter);

// app.use(express.static("./notification.js"));

// app.get("/api/notification", (request, response) => {
//   response.setHeader("Content-Type", "text/event-stream");
//   response.setHeader("Connection", "keep-alive");
//   response.setHeader("Cache-Control", "no-cache");

//   notificationEvent.on("update", (users) => {
//     response.write(`event: update\ndata: ${JSON.stringify(users)}\n\n`);
//   });
// });
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://${process.env.HOST || "localhost"}:${
      process.env.PORT_CLIENT || 8000
    }`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.use((req, res, next) => {
//     return res.sendStatus(500);
// })

module.exports = server;
