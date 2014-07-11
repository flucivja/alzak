(function(window, app, Phaser) {

    'use strict';

    var alzak,
        blood,
        game = app.game,
        baseLayer,
        shouldChangePos = true;

    app.createAsset('alzak', {

        preload: function() {
            game.load.image('alzak', 'img/alzak_min.png');
            game.load.image('blood', 'img/blood_min.png');
        },

        create: function() {
            baseLayer = app.layer('baseLayer', 0);
            
            alzak = new Phaser.Sprite(game, game.world.centerX, game.world.centerY, 'alzak');
            game.physics.arcade.enable(alzak);
            baseLayer.add(alzak);
            this.shape = alzak;
        },

        update: function() {
            move();
        },

        kill: function() {
            app.assets.hud.increaseScore();
            alzak.kill();

            var newX = game.world.randomX, 
                newY = game.world.randomY,
                alzakWidth = alzak.texture.width,
                alzakHeight = alzak.texture.height;

            if(newX > game.world.width - alzakWidth) {
                newX = game.world.width - alzakWidth;
            } else if(newX < 0) {
                newX = 0;
            }

            if(newY > game.world.height - alzakHeight) {
                newY = game.world.height - alzakHeight;
            } else if(newY < 0) {
                newY = 0;
            }

            blood = new Phaser.Sprite(game, alzak.position.x, alzak.position.y, 'blood');
            baseLayer.add(blood);
            blood.lifespan = 2000;
            alzak.reset(newX, newY);
            alzak.bringToTop();
            if(this.timeout !== undefined) {
                window.clearTimeout(this.timeout);
                this.timeout = undefined;
            }
        }

    });

    function changeDirection() {
        var rand;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.y = rand > 500 ? app.config.speed : - app.config.speed;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.x = rand > 500 ? app.config.speed : - app.config.speed;
    }

    function move() {
        var playerPosition = app.assets.player.shape.position,
            self = app.assets.alzak;

        if(self.timeout === undefined) {
            changeDirection();
            self.timeout = window.setTimeout(function() {
                changeDirection();
                window.clearTimeout(self.timeout);
                self.timeout = undefined;
            }, 1500);
        }

        if(playerPosition.x > alzak.position.x && playerPosition.x <  alzak.position.x + alzak.texture.width && playerPosition.y > alzak.position.y && playerPosition.y <  alzak.position.y + alzak.texture.height) {
            if(shouldChangePos) {
                window.setTimeout(changeDirection, 200);
                shouldChangePos = false;
            }
        } else {
            shouldChangePos = true;
        }

        if(alzak.position.x > game.world.width - alzak.texture.width) {
            alzak.body.velocity.x = -app.config.speed;
        } else if(alzak.position.x < 0) {
            alzak.body.velocity.x = app.config.speed;
        }

        if(alzak.position.y > game.world.height - alzak.texture.height) {
            alzak.body.velocity.y = -app.config.speed;
        } else if(alzak.position.y < 0) {
            alzak.body.velocity.y = app.config.speed;
        } 
    }

}(this, this.app || {}, this.Phaser));