require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const mainRouter = require("./routes");

const app = express();

app.use(mainRouter);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:8000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", () => {
  console.log("New client connected");
});

// app.use((req, res, next) => {
//     return res.sendStatus(500);
// })

module.exports = server;
