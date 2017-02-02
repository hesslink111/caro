"use strict";
class Player {
    constructor(icon, username, wins, losses) {
        this.icon = icon;
        this.username = username;
        this.wins = wins;
        this.losses = losses;
    }
    static isLoggedIn() {
        return this.loggedIn;
    }
    static getPlayerInstance() {
        if (this.currentPlayerInstance == null) {
            //Default user for now
            this.currentPlayerInstance = new Player("boy-0", "Bob", 0, 0);
            this.loggedIn = true;
        }
        return this.currentPlayerInstance;
    }
    static getOpponentPlayerInstance() {
        if (this.opponentPlayerInstance == null) {
            //Default user for now
            this.opponentPlayerInstance = new Player("girl-0", "Claire", 0, 0);
            this.loggedIn = true;
        }
        return this.opponentPlayerInstance;
    }
    static setCurrentPlayerInstance(player) {
        this.currentPlayerInstance = player;
        this.loggedIn = true;
    }
    static deleteCurrentPlayerInstance() {
        this.currentPlayerInstance = null;
        this.loggedIn = false;
    }
    static setOpponentPlayerInstance(player) {
        this.opponentPlayerInstance = player;
        this.loggedIn = true;
    }
    static deleteOpponentPlayerInstance() {
        this.opponentPlayerInstance = null;
        this.loggedIn = false;
    }
    getIcon() {
        return this.icon;
    }
    setIcon(icon) {
        this.icon = icon;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getWins() {
        return this.wins;
    }
    setWins(wins) {
        this.wins = wins;
    }
    getLosses() {
        return this.losses;
    }
    setLosses(losses) {
        this.losses = losses;
    }
}
Player.loggedIn = false;
exports.Player = Player;
//# sourceMappingURL=Player.js.map