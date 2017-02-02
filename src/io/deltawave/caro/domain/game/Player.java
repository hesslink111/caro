package io.deltawave.caro.domain.game;

import com.google.gson.JsonObject;
import org.java_websocket.WebSocket;

/**
 * Created by will on 7/6/16.
 */
public class Player {
    private WebSocket webSocket;
    private Game game;

    private String username;
    private String icon;
    private int wins;
    private int losses;
    private int moves;

    public Player(WebSocket webSocket) {
        this.webSocket = webSocket;
        this.game = null;

        this.username = null;
        this.wins = 0;
        this.losses = 0;
        this.moves = 0;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void send(String message) {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", message);
        this.webSocket.send(jo.toString());
    }

    public void sendMatchFound(Player otherPlayer) {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", "MatchFound");

        JsonObject data = new JsonObject();
        data.addProperty("icon", otherPlayer.getIcon());
        data.addProperty("name", otherPlayer.getUsername());
        data.addProperty("wins", otherPlayer.getWins());
        data.addProperty("losses", otherPlayer.getLosses());

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void sendIsCurrentPlayer() {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", "CurrentPlayerUpdate");

        JsonObject data = new JsonObject();
        data.addProperty("currentPlayer", "current");

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void sendIsNotCurrentPlayer() {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", "CurrentPlayerUpdate");

        JsonObject data = new JsonObject();
        data.addProperty("currentPlayer", "opponent");

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void sendMatchBegin(char currentPlayerPiece, char otherPlayerPiece) {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", "MatchBegin");

        JsonObject data = new JsonObject();
        data.addProperty("currentPlayerPiece", currentPlayerPiece);
        data.addProperty("otherPlayerPiece", otherPlayerPiece);

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void send(String message, int startTimeMs) {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", message);

        JsonObject data = new JsonObject();
        data.addProperty("startTimeMs", startTimeMs);

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void send(String message, int x, int y, char piece) {
        JsonObject jo = new JsonObject();
        jo.addProperty("type", message);

        JsonObject data = new JsonObject();
        data.addProperty("x", x);
        data.addProperty("y", y);
        data.addProperty("piece", piece);

        jo.add("data", data);
        this.webSocket.send(jo.toString());
    }

    public void receiveMessageObject(String type, JsonObject data) {
        if(type.equals("MatchFoundReady")) {

        } else if(type.equals("MatchReady")) {
            if(game != null) {
                game.setReady(this);
            }

        } else if(type.equals("MatchMoveRequest")) {
            if(game != null) {
                int x = data.get("x").getAsInt();
                int y = data.get("y").getAsInt();
                game.makeMove(this, x, y);
            }

        } else if(type.equals("PlayerUpdate")) {
            username = data.get("username").getAsString();
            icon = data.get("icon").getAsString();
        }
    }

    public void disconnect() {
        if(game != null) {
            game.removePlayer(this);
        }
    }

    public void matchEnd() {
        game = null;
        send("MatchEnd");
    }

    public void winGame() {
        wins++;
        send("MatchWon");
    }

    public void loseGame() {
        losses++;
        send("MatchLost");
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public int getWins() {
        return wins;
    }

    public int getLosses() {
        return losses;
    }

    public int getMoves() {
        return moves;
    }

}
