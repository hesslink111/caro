import {Page} from "../page/Page";
import {Player} from "./Player";

export class PlayerHelper {

    public static updateCurrentPlayerView(pageContext: Page) {
        pageContext.updateElementAttribute("[data-instance-identity='current-player'] .player-icon",
            "src",
            "images/player/" + Player.getPlayerInstance().getIcon() + ".svg");

        pageContext.updateElementText("[data-instance-identity='current-player'] .player-name",
            Player.getPlayerInstance().getUsername());

        pageContext.updateElementText("[data-instance-identity='current-player'] .player-wins",
            "Wins: " + Player.getPlayerInstance().getWins().toString());

        pageContext.updateElementText("[data-instance-identity='current-player'] .player-losses",
            "Losses : " + Player.getPlayerInstance().getLosses().toString());
    }

    static updateOpponentPlayerView(pageContext: Page) {
        pageContext.updateElementAttribute("[data-instance-identity='other-player'] .player-icon",
            "src",
            "images/player/" + Player.getOpponentPlayerInstance().getIcon() + ".svg");

        pageContext.updateElementText("[data-instance-identity='other-player'] .player-name",
            Player.getOpponentPlayerInstance().getUsername());

        pageContext.updateElementText("[data-instance-identity='other-player'] .player-wins",
            "Wins: " + Player.getOpponentPlayerInstance().getWins().toString());

        pageContext.updateElementText("[data-instance-identity='other-player'] .player-losses",
            "Losses : " + Player.getOpponentPlayerInstance().getLosses().toString());
    }
}