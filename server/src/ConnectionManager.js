const User = require('./User');

class ConnectionManager {
    constructor() {
        this.connections = {};
        this.users = {};
        this.gameReadySent = false;
    }

    addUserConnection(uuid, connection, username) {

        if (Object.keys(this.connections).length >= 2) {
            this.removeUserConnection(uuid)
        }

        const user = new User(username);
        this.connections[uuid] = connection;
        this.users[uuid] = user;

        // Verificar se já temos dois jogadores e ainda não enviamos a mensagem "GAME READY"
        if (Object.keys(this.connections).length >= 2 && !this.gameReadySent) {
            this.sendGameReady();
            this.gameReadySent = true;
        }
    }

    removeUserConnection(uuid) {
        delete this.connections[uuid];
        delete this.users[uuid];
        
        // Se o número de conexões cair abaixo de 2, reiniciar o status de "GAME READY"
        if (Object.keys(this.connections).length < 2) {
            this.gameReadySent = false;
        }
    }

    sendGameReady() {
        Object.values(this.connections).forEach(connection => {
            connection.send(JSON.stringify({ message: "GAME READY" }));
        });
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
