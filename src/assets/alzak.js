(function(game) {

	'use strict';

	var alzak,
		blood,
		scene = game.scene,
		shouldChangePos = true;

	game.create('alzak', {

		preload: function() {
			scene.load.image('alzak', 'img/alzak_min.png');
			scene.load.image('blood', 'img/blood_min.png');
		},

		create: function() {
			alzak = scene.add.sprite(scene.world.centerX, scene.world.centerY, 'alzak');
        	scene.physics.arcade.enable(alzak);

        	this.shape = alzak;
		},

		update: function() {
			//move();
		},

		kill: function() {
			game.assets.hud.increaseScore();
			alzak.kill();

			var newX = scene.world.randomX, 
                newY = scene.world.randomY,
                alzakWidth = alzak.texture.width,
            	alzakHeight = alzak.texture.height;

            if(newX > scene.world.width - alzakWidth) {
                newX = scene.world.width - alzakWidth;
            } else if(newX < 0) {
                newX = 0;
            }
            
            if(newY > scene.world.height - alzakHeight) {
                newY = scene.world.height - alzakHeight;
            } else if(newY < 0) {
                newY = 0;
            }
            
            blood = scene.add.sprite(alzak.position.x, alzak.position.y, 'blood');
            blood.lifespan = 2000;
            alzak.reset(newX, newY);
            alzak.bringToTop();
            if(this.timeout !== undefined) {
                clearTimeout(this.timeout);
                this.timeout = undefined;
            }
		}

	});

	function changeDirection() {
        var rand;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.y = rand > 500 ? game.config.speed : - game.config.speed;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.x = rand > 500 ? game.config.speed : - game.config.speed;
    }

    function move() {
    	var playerPosition = game.assets.player.shape.position,
			self = game.assets.alzak;

		if(self.timeout === undefined) {
            changeDirection();
            self.timeout = setTimeout(function() {
                changeDirection();
                clearTimeout(self.timeout);
                self.timeout = undefined;
            }, 1500);
        }

        if(playerPosition.x > alzak.position.x && playerPosition.x <  alzak.position.x + alzak.texture.width && playerPosition.y > alzak.position.y && playerPosition.y <  alzak.position.y + alzak.texture.height) {
        	if(shouldChangePos) {
        		setTimeout(function() {
        			changeDirection();
        		}, 200);	        		
        		shouldChangePos = false;
        	}
        } else {
        	shouldChangePos = true;
        }

        if(alzak.position.x > scene.world.width - alzak.texture.width) {
            alzak.body.velocity.x = -game.config.speed;
        } else if(alzak.position.x < 0) {
            alzak.body.velocity.x = game.config.speed;
        }

        if(alzak.position.y > scene.world.height - alzak.texture.height) {
            alzak.body.velocity.y = -game.config.speed;
        } else if(alzak.position.y < 0) {
            alzak.body.velocity.y = game.config.speed;
        } 
    }

}(window.game || {}));