export class Player {
    private static loggedIn: boolean = false;
    private static currentPlayerInstance: Player;
    private static opponentPlayerInstance: Player;

    private icon: string;
    private username: string;
    private wins: number;
    private losses: number;

    public static isLoggedIn() {
        return this.loggedIn;
    }

    public static getPlayerInstance(): Player {
        if(this.currentPlayerInstance == null) {
            //Default user for now
            this.currentPlayerInstance = new Player("boy-0", "Bob", 0, 0);
            this.loggedIn = true;
        }
        return this.currentPlayerInstance;
    }

    public static getOpponentPlayerInstance(): Player {
        if(this.opponentPlayerInstance == null) {
            //Default user for now
            this.opponentPlayerInstance = new Player("girl-0", "Claire", 0, 0);
            this.loggedIn = true;
        }
        return this.opponentPlayerInstance;
    }

    public static setCurrentPlayerInstance(player: Player): void {
        this.currentPlayerInstance = player;
        this.loggedIn = true;
    }

    public static deleteCurrentPlayerInstance(): void {
        this.currentPlayerInstance = null;
        this.loggedIn = false;
    }

    public static setOpponentPlayerInstance(player: Player): void {
        this.opponentPlayerInstance = player;
        this.loggedIn = true;
    }

    public static deleteOpponentPlayerInstance(): void {
        this.opponentPlayerInstance = null;
        this.loggedIn = false;
    }

    constructor(icon: string, username: string, wins: number, losses: number) {
        this.icon = icon;
        this.username = username;
        this.wins = wins;
        this.losses = losses;
    }

    public getIcon(): string {
        return this.icon;
    }

    public setIcon(icon: string): void {
        this.icon = icon;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getWins(): number {
        return this.wins;
    }

    public setWins(wins: number): void {
        this.wins = wins;
    }

    public getLosses(): number {
        return this.losses;
    }

    public setLosses(losses: number): void {
        this.losses = losses;
    }
}