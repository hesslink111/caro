package io.deltawave.caro.domain.game;

/**
 * Created by will on 7/6/16.
 */
public class Game {
    private String id;
    private Player xPlayer;
    private Player oPlayer;
    private Board board;

    //Start state
    private boolean xPlayerReady;
    private boolean oPlayerReady;

    //Game state
    private char currentPiece;
    private boolean started;
    private boolean finished;
    private Player winner;
    private int numMoves;

    public Game(Player xPlayer, Player oPlayer) {
        this.xPlayer = xPlayer;
        this.oPlayer = oPlayer;
        this.board = new Board();
        this.currentPiece = 'x';

        this.xPlayerReady = false;
        this.oPlayerReady = false;

        this.started = false;
        this.finished = false;
        this.winner = null;
        this.numMoves = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Player getxPlayer() {
        return xPlayer;
    }

    public Player getoPlayer() {
        return oPlayer;
    }

    public Board getBoard() {
        return board;
    }

    public boolean isFinished() {
        return finished;
    }

    public Player getWinner() {
        return winner;
    }

    public Player getCurrentPlayer() {
        return currentPiece=='x'?xPlayer:oPlayer;
    }

    private void switchCurrentPlayer() {
        if(currentPiece == 'x') {
            currentPiece = 'o';
            xPlayer.sendIsNotCurrentPlayer();
            oPlayer.sendIsCurrentPlayer();
        } else {
            currentPiece = 'x';
            xPlayer.sendIsCurrentPlayer();
            oPlayer.sendIsNotCurrentPlayer();
        }
    }

    public boolean makeMove(Player player, int x, int y) {
        if(!started) {
            return false;
        }

        if(player != getCurrentPlayer()) {
            return false;
        }

        if(finished) {
            return false;
        }

        if(!board.setPieceAt(x, y, currentPiece)) {
            return false;
        }

        xPlayer.send("MatchMove", x, y, currentPiece);
        oPlayer.send("MatchMove", x, y, currentPiece);

        checkNumMoves(true);

        checkVictoryAllDirections(x, y, currentPiece);

        if(!finished) {
            switchCurrentPlayer();
        }

        return true;
    }

    private void checkNumMoves(boolean increment) {
        if(increment) {
            numMoves++;
        }

        if(numMoves >= 361) {
            finished = true;
            winner = null;

            xPlayer.matchEnd();
            oPlayer.matchEnd();
        }
    }

    private void checkVictoryAllDirections(int x, int y, char pieceNeeded) {
        if((checkVictory(x, y, 1, 1, pieceNeeded, 5) + checkVictory(x, y, -1, -1, pieceNeeded, 5) - 1) >= 5 ||
                (checkVictory(x, y, 1, -1, pieceNeeded, 5) + checkVictory(x, y, -1, 1, pieceNeeded, 5) - 1) >= 5 ||
                (checkVictory(x, y, 1, 0, pieceNeeded, 5) + checkVictory(x, y, -1, 0, pieceNeeded, 5) - 1) >= 5 ||
                (checkVictory(x, y, 0, 1, pieceNeeded, 5) + checkVictory(x, y, 0, -1, pieceNeeded, 5) - 1) >= 5) {
            finished = true;
            winner = getCurrentPlayer();

            winner.winGame();
            if(xPlayer != winner) {
                xPlayer.loseGame();
            } else {
                oPlayer.loseGame();
            }
        }
    }

    private int checkVictory(int x, int y, int xVector, int yVector, char pieceNeeded, int numToCheck) {
        if(numToCheck == 0) {
            return 0;
        }

        if(board.getPieceAt(x, y) == pieceNeeded) {
            return 1 + checkVictory(x+xVector, y+yVector, xVector, yVector, pieceNeeded, numToCheck-1);
        } else {
            return 0;
        }
    }

    public void setReady(Player player) {
        if(player == xPlayer) {
            xPlayerReady = true;
        }
        if(player == oPlayer) {
            oPlayerReady = true;
        }

        if(xPlayerReady && oPlayerReady) {
            started = true;

            xPlayer.sendMatchBegin('x', 'o');
            oPlayer.sendMatchBegin('o', 'x');

            if(currentPiece == 'x') {
                xPlayer.sendIsCurrentPlayer();
                oPlayer.sendIsNotCurrentPlayer();
            } else {
                oPlayer.sendIsCurrentPlayer();
                xPlayer.sendIsNotCurrentPlayer();
            }
        }
    }

    public void removePlayer(Player player) {
        if(player == xPlayer) {
            xPlayer = null;
            oPlayer.matchEnd();
        } else if(player == oPlayer) {
            oPlayer = null;
            xPlayer.matchEnd();
        }
    }
}
