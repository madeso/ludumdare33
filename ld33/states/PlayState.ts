module ld33 {
    export class PlayState extends Phaser.State {
        game: Phaser.Game;
        player: ld33.Player;

        constructor() {
            super();
        }

        map: Phaser.Tilemap;
        backgroundlayer: Phaser.TilemapLayer;

        create() {
            this.map = this.game.add.tilemap('level1', 128, 128);
            this.map.addTilesetImage('tiles', 'tiles');
            this.backgroundlayer = this.map.createLayer('ground');
            this.map.createLayer('buildings');
            
            // blockedLayer = this.map.createLayer('blockedLayer');
            // map.setCollisionBetween(1, 100000, true, 'blockedLayer');
            this.backgroundlayer.resizeWorld();

            this.player = new Player(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.player);

            this.camera.follow(this.player);
        }
    }
}