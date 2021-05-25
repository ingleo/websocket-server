const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Sockets config
    this.sockets();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //Public directory
    this.app.use(express.static("public"));
  }

  //routes
  routes() {}

  //sockets
  sockets() {
    //conectar server
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(process.env.PORT || 3000, () => {
      console.log("Servidor ejecuntando en puerto ", this.port);
    });
  }
}

module.exports = Server;
