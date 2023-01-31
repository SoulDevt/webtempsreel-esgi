let users = [];
const adminSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`Admin connected ${socket.id}`);
    socket.on("get", () => {
      console.log("get", users);
      socket.emit("get", users);
    });

    socket.on("add", ({ id, name }) => {
      users.push({ id, name, socket: socket.id });
      socket.broadcast.emit("get", users);
      socket.emit("get", users);
      console.log("add", users);
    });

    socket.on("remove", (id) => {
      users = users.filter((user) => user.id !== id);
      socket.broadcast.emit("get", users);
      socket.emit("get", users);
      console.log("remove", users);
    });

    socket.on("disconnect", (id) => {
      users = users.filter((user) => user.id !== id);
      socket.broadcast.emit("get", users);
      console.log("Admin disconnected", users);
    });
  });
};

module.exports = {
  adminSocket,
};
