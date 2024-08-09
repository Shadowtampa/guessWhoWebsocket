// ConnectionManager.js
const User = require('./User');

class ConnectionManager {
    constructor() {
        this.connections = {};
        this.users = {};
    }

    addUserConnection(uuid, connection, username) {
        const user = new User(username);
        this.connections[uuid] = connection;
        this.users[uuid] = user;
    }

    removeUserConnection(uuid) {
        delete this.connections[uuid];
        delete this.users[uuid];
    }

    broadcast() {
        Object.values(this.connections).forEach(connection => {
            connection.send(JSON.stringify(this.users));
        });
    }

    handleMessage(uuid, message) {
        this.users[uuid].updateState(message);
        this.broadcast();
    }
}


module.exports = ConnectionManager;