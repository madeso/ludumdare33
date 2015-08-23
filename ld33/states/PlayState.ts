module ld33 {
    export class PlayState extends Phaser.State {
        game: Phaser.Game;
        player: ld33.Player;

        constructor() {
            super();
        }

        create() {
            this.player = new Player(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.player);
        }
    }
}