const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
        }
        // Middleware
        this.middleware();
        //routes of my application
        this.routes();
        //Sockets
        this.sockets();
    }

    middleware() {
        //CORS
        this.app.use(cors());
        //public methods
        this.app.use(express.static('public'));
    }

    routes() {
    }

    sockets() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;