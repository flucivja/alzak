(function(game) {

	'use strict';

	var player,
		guncross,
		scene = game.scene;

	game.create('player', {

		preload: function() {
			scene.load.image('shotgun', 'img/shotgun_min.png');
			scene.load.image('guncross', 'img/gun_cross_min.png');
		},

		create: function() {
			player = scene.add.sprite(scene.world.width - 280, scene.world.height - 125, 'shotgun');
        	scene.physics.arcade.enable(player);

        	guncross = scene.add.sprite(scene.world.centerX, scene.world.centerY, 'guncross');
        	guncross.anchor.set(0.5);
        	scene.physics.arcade.enable(guncross);

        	scene.input.onDown.add(shoot, window);  

        	this.shape = guncross;
		},

		update: function() {
			player.angle = (scene.input.activePointer.position.x / 400);
			guncross.position.copyFrom(scene.input.activePointer.position);
		}

	});

	function shoot(pointer) {
        
        var alzakObject = game.assets.alzak,
        	alzak = alzakObject.shape,
        	alzakWidth = alzak.texture.width,
            alzakHeight = alzak.texture.height;

        if(pointer.x > alzak.position.x && pointer.x <  alzak.position.x + alzakWidth && pointer.y > alzak.position.y && pointer.y <  alzak.position.y + alzakHeight) {
            alzakObject.kill();
            game.config.speed += 50;
            guncross.bringToTop();
            player.bringToTop();
        }

    }

}(window.game || {}));