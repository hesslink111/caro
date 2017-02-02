package io.deltawave.caro;

import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import io.deltawave.caro.domain.game.Player;
import io.deltawave.caro.matchmaking.MatchMaking;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.HashMap;

/**
 * Created by will on 7/8/16.
 */
public class Server extends WebSocketServer {

    private HashMap<WebSocket, Player> playerMap;

    private MatchMaking matchMaking;

    private JsonParser parser;

    public Server(int port) throws IOException {
        super(new InetSocketAddress(port));
        playerMap = new HashMap<>();

        matchMaking = new MatchMaking();

        parser = new JsonParser();
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {

        System.out.println("Player connected");

        Player player = new Player(webSocket);
        playerMap.put(webSocket, player);

    }

    @Override
    public void onClose(WebSocket webSocket, int i, String s, boolean b) {
        System.out.println("Player disconnected");

        Player p = playerMap.get(webSocket);
        p.disconnect();

        playerMap.remove(webSocket);

        matchMaking.remove(p);
    }

    @Override
    public void onMessage(WebSocket webSocket, String s) {
        try {
            JsonObject object = parser.parse(s).getAsJsonObject();
            String type = object.get("type").getAsString();

            JsonObject data = null;
            if(object.has("data")) {
                data = object.get("data").getAsJsonObject();
            }

            System.out.println("Message type: " + type);

            Player player = playerMap.get(webSocket);
            switch(type) {
                case "MatchMakingRequest":
                    matchMaking.add(player);
                    break;
                default:
                    player.receiveMessageObject(type, data);
                    break;
            }

        } catch(JsonParseException ex) {
            System.err.println(ex.toString());
        } catch(UnsupportedOperationException ex) {
            System.err.println(ex.toString());
        }
    }

    @Override
    public void onError(WebSocket webSocket, Exception e) {
        System.out.println("Error?");
        e.printStackTrace();
    }
}
