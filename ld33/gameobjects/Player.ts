﻿module ld33 {
    export enum AnimationState {
        IDLE, WALKING, DASH
    }

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        anim: AnimationState;

        move_right: boolean;
        move_left: boolean;
        move_up: boolean;
        move_down: boolean;

        facing_right: boolean;
        dashTimer: number;

        private static DASH_SPEED: number = 4.0;
        private static DASH_ANIM_SPEED: number = 15;
        private static DASH_TIME: number = 0.5;
        private static DASH_WAIT: number = 0.3;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.dashTimer = -1;

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
            this.anchor.set(0.5, 1.0);

            this.animations.add("idle", [0], 10, true);
            this.animations.add("walking", [1, 2], 5, true);
            this.animations.add("dash", [3, 4], Player.DASH_ANIM_SPEED, true);

            this.animations.play("idle");
            this.anim = AnimationState.IDLE;
            this.facing_right = true;
        }

        playIdle() {
            if (this.anim != AnimationState.IDLE) {
                this.anim = AnimationState.IDLE;
                this.animations.play("idle");
            }
        }

        playWalking() {
            if (this.anim != AnimationState.WALKING) {
                this.anim = AnimationState.WALKING;
                this.animations.play("walking");
            }
        }

        playDash() {
            if (this.anim != AnimationState.DASH) {
                this.anim = AnimationState.DASH;
                this.animations.play("dash");
            }
        }

        DoDash() {
            if (this.dashTimer < -Player.DASH_WAIT) {
                this.dashTimer = Player.DASH_TIME;
            }
        }

        DoAttack() {
        }

        update() {
            if (this.dashTimer > 0) {
                var dx = 0.0;
                if (this.facing_right) dx = 1;
                else dx = -1;
                this.x += dx * Player.DASH_SPEED * (60 / this.game.time.elapsedMS);
                this.dashTimer -= this.game.time.elapsedMS / 1000;
                this.playDash();
            }
            else {
                if (this.dashTimer > -Player.DASH_WAIT) {
                    this.dashTimer -= this.game.time.elapsedMS / 1000;
                }
                var dx = 0.0;
                var dy = 0.0;
                if (this.move_right) dx += 1;
                if (this.move_left) dx -= 1;

                if (this.move_up) dy -= 1;
                if (this.move_down) dy += 1;

                this.x += dx * (60 / this.game.time.elapsedMS);
                this.y += dy * (60 / this.game.time.elapsedMS);

                if (dx != 0 || dy != 0) this.playWalking();
                else this.playIdle();

                if (dx > 0) this.facing_right = true;
                if (dx < 0) this.facing_right = false;

                if (this.facing_right) this.scale.set(1, 1);
                else this.scale.set(-1, 1);
            }
        }
    }
}