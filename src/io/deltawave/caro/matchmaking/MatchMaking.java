package io.deltawave.caro.matchmaking;

import io.deltawave.caro.domain.game.Game;
import io.deltawave.caro.domain.game.Player;

import java.util.ArrayDeque;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by will on 7/13/16.
 */
public class MatchMaking {

    private ArrayDeque<Player> lobby;

    public MatchMaking() {
        lobby = new ArrayDeque<>();
    }

    public void add(Player player) {
        this.lobby.add(player);

        checkMatches();
    }

    public void remove(Player player) {
        this.lobby.remove(player);
    }

    private void checkMatches() {
        while(lobby.size() >= 2) {
            Player p1 = lobby.remove();
            Player p2 = lobby.remove();

            p1.sendMatchFound(p2);
            p2.sendMatchFound(p1);

            Game game = new Game(p1, p2);
            p1.setGame(game);
            p2.setGame(game);

            p1.send("MatchStartInMs", 5000);
            p2.send("MatchStartInMs", 5000);

            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    p1.send("MatchStart");
                    p2.send("MatchStart");
                }
            }, 5000);
        }
    }

}
