import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    const { io } = res.socket.server;

    io.on("connection", (socket) => {
      socket.on("order-finished", (id) => {
        socket.broadcast.emit("order-finished", id);
      });

      socket.on("new-order", (newOrder) => {
        socket.broadcast.emit("new-order", newOrder);
      });
    });
  } else {
    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("order-finished", (id) => {
        socket.broadcast.emit("order-finished", id);
      });

      socket.on("new-order", (newOrder) => {
        socket.broadcast.emit("new-order", newOrder);
      });
    });
  }

  res.end();
};

export default SocketHandler;
