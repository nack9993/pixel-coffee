import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log(res.socket.server.io);
    console.log("Socket is already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.emit("hello", "world");
      socket.on("order-finished", (id) => {
        socket.broadcast.emit("update-order", id);
      });
    });
  }
  res.end();
};

export default SocketHandler;
