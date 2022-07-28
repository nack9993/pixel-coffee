import { Server, Socket } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    res.end();
    return;
    // const { io } = res.socket.server;

    // io.on("connection", (socket: Socket) => {
    //   socket.on("order-finished", (id) => {
    //     socket.broadcast.emit("order-finished", id);
    //   });

    //   socket.on("new-order", (newOrder) => {
    //     socket.broadcast.emit("new-order", newOrder);
    //   });
    // });
  }

  const io = new Server(res.socket.server);

  res.socket.server.io = io;

  io.on("connection", (socket: Socket) => {
    socket.on("order-finished", (id) => {
      socket.broadcast.emit("order-finished", id);
    });

    socket.on("new-order", (newOrder) => {
      socket.broadcast.emit("new-order", newOrder);
    });
  });
  console.log("Setting up socket");
  res.end();
};

export default SocketHandler;
