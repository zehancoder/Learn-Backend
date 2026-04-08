import { createServer } from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
const httpServer = createServer(app);// we make manual server in  http;
const io = new Server(httpServer, { // merge socket.io server and http express server
  /*options */
});

io.on("connection", (socket) => {
  console.log("new connection created"); // when new user connected with server it's run
  socket.on('message', (msg) => {
    console.log('User fired message event');
    console.log(msg);
    io.emit('abc')
  })
});
httpServer.listen(3000, () => {
  console.log(" server running of port 3000");
});
