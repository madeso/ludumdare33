module ld33 {
    export enum PlayerState {
        IDLE, WALKING
    }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        state: PlayerState;

        move_right: boolean;
        move_left: boolean;
        move_up: boolean;
        move_down: boolean;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;

            var key: Phaser.Key;

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            key.onDown.add(() => { this.move_right = true; });
            key.onUp.add(() => { this.move_right = false; });

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            key.onDown.add(() => { this.move_left = true; });
            key.onUp.add(() => { this.move_left = false; });

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            key.onDown.add(() => { this.move_up = true; });
            key.onUp.add(() => { this.move_up = false; });

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            key.onDown.add(() => { this.move_down = true; });
            key.onUp.add(() => { this.move_down = false; });

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            key.onDown.add(() => { this.DoDash(); });

            key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            key.onDown.add(() => { this.DoAttack(); });

            super(game, x, y, "player", 0);
            this.anchor.set(0.0, 1.0);

            this.animations.add("idle", [0], 10, true);
            this.animations.add("walk", [1, 2], 10, true);

            this.animations.play("idle");
        }

        DoDash() {
        }

        DoAttack() {
        }

        update() {
            var dx = 0.0;
            if (this.move_right) dx += 1;
            if (this.move_left) dx -= 1;

            this.x += dx * (60 / this.game.time.elapsedMS);
        }
    }
}