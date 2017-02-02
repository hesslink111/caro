package io.deltawave.caro.domain.game;

import java.util.stream.IntStream;

/**
 * Created by will on 7/6/16.
 */
public class Board {
    private static char EMPTYPIECE = '·';

    private String id;
    private char[][] board;

    public Board() {
        char[][] board = new char[19][19];

        //Hipster code for initializing board
        IntStream
                .range(0, 19)
                .forEach(y -> IntStream
                        .range(0, 19)
                        .forEach(x -> board[y][x] = EMPTYPIECE));

        this.board = board;
    }

    public Board(String id, char[][] board) {
        this.id = id;
        this.board = board;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public char[][] getBoard() {
        return board;
    }

    public boolean positionOpen(int x, int y) {
        if(!positionValid(x, y)) {
            return false;
        }

        return board[y][x] == EMPTYPIECE;
    }

    public char getPieceAt(int x, int y) {
        if(!positionValid(x, y)) {
            return ' ';
        }

        return board[y][x];
    }

    public boolean setPieceAt(int x, int y, char piece) {
        if(!positionOpen(x, y)) {
            return false;
        }

        board[y][x] = piece;
        return true;
    }

    private boolean positionValid(int x, int y) {
        return x>=0 && x<19 && y>=0 && y<19;
    }

}
