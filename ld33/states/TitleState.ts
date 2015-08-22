module ld33 {
    export class TitleState extends Phaser.State {
        game: Phaser.Game;
        image: Phaser.Sprite;

        constructor() {
            super();
        }

        create() {
            this.image = this.game.add.sprite(0, 0, "titlescreen");
            this.image.scale.setTo(this.game.width / this.image.width,
                this.game.height / this.image.height);
        }
    }
}