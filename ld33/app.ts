module game {
    export class Main {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create:this.create, preload: this.preload
            });
        }

        preload() {
            // title graphics
            this.game.load.image("titlescreen", "assets/title.png");

            // spritesheets
            this.game.load.spritesheet("player", "assets/player.png", 128, 128);

            // audio

            // levels
            this.game.load.tilemap("level1", "assets/level1.json", null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet("tiles", "assets/tiles.png", 128, 128);
        }

        create() {
            this.game.state.add("title", ld33.TitleState, true);
            this.game.state.add("game", ld33.PlayState, false);

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    }
}

window.onload = () => {
    var g = new game.Main();
};
