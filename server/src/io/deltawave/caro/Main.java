package io.deltawave.caro;

import io.deltawave.caro.domain.game.Board;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {

        if(args.length != 1) {
            System.out.println("Usage: java -jar CaroServer.jar PORT");
            System.exit(1);
        }

        int portnum = 0;
        try {
            portnum = Integer.parseInt(args[0]);
        } catch(NumberFormatException ex) {
            System.out.println("Error: PORT must be an integer.");
            System.exit(1);
        }

        try {
            Server server = new Server(portnum);
            server.run();
        } catch(IOException ex) {
            System.out.println(ex);
        }

    }

    public static void printBoard(Board board) {
        char[][] b = board.getBoard();
        System.out.print("    ");
        for(int x = 0; x<19; x++) {
            System.out.printf("%2d ", x);
        }
        System.out.println();
        System.out.println();

        for(int y = 0; y<19; y++) {
            System.out.printf("%2d   ", y);
            for(int x = 0; x<19; x++) {
                System.out.print(b[y][x] + "  ");
            }
            System.out.println();
        }
        System.out.println();
    }
}
