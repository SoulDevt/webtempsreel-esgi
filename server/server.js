import { Server } from "socket.io";

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
    
});
console.log("listening on port 3000");
io.listen(3000);