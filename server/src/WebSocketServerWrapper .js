// WebSocketServerWrapper.js
const { WebSocketServer } = require('ws');
const http = require('http');
const url = require('url');
const uuidv4 = require('uuid').v4;
const ConnectionManager = require('./ConnectionManager');

class WebSocketServerWrapper {
    constructor(port) {
        this.connectionManager = new ConnectionManager();
        this.server = http.createServer();
        this.wsServer = new WebSocketServer({ server: this.server });
        this.port = port;

        this.wsServer.on('connection', (connection, request) => this.onConnection(connection, request));
        this.server.listen(this.port, '0.0.0.0' ,() => {
            console.log(`WebSocket server is running on port ${this.port}`);
        });
    }

    onConnection(connection, request) {
        const { username } = url.parse(request.url, true).query;
        const uuid = uuidv4();

        console.log(`${username} connected`);

        this.connectionManager.addUserConnection(uuid, connection, username);

        connection.send(JSON.stringify({ message: `Bem-vindo, ${username}!`, userId: uuid }));

        connection.on('message', message => {
            try {
                this.connectionManager.handleMessage(uuid, JSON.parse(message.toString()));
            } catch (error) {
                console.error(`Error handling message from ${username}: ${error.message}`);
            }
        });        
        connection.on('close', () => this.connectionManager.removeUserConnection(uuid));
    }
}


module.exports = WebSocketServerWrapper;