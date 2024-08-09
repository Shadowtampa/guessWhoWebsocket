class User {
    constructor(username) {
        this.username = username;
        this.state = {};
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
    }
}


module.exports = User;