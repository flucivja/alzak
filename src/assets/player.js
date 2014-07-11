(function(window, app, Phaser) {

    'use strict';

    var player,
        guncross,
        shadowTexture,
        lightSprite,
        game = app.game,
        LIGHT_RADIUS = 200;

    app.createAsset('player', {

        preload: function() {
            game.load.image('shotgun', 'img/shotgun_min.png');
            game.load.image('guncross', 'img/gun_cross_min.png');
        },

        create: function() {
            var playerLayer = app.layer('playerLayer', 10);
            guncross = new Phaser.Sprite(game, game.world.centerX, game.world.centerY, 'guncross');
            guncross.anchor.set(0.5);
            game.physics.arcade.enable(guncross);
            playerLayer.add(guncross);
            game.input.onDown.add(shoot, window);
            this.shape = guncross;
            
            
            playerLayer.stage.backgroundColor = 0xffffff;

            // Create the shadow texture
            shadowTexture = game.add.bitmapData(game.width, game.height);
            
            // Create an object that will use the bitmap as a texture
            lightSprite = game.add.image(0, 0, shadowTexture);

            // Set the blend mode to MULTIPLY. This will darken the colors of
            // everything below this sprite.
            lightSprite.blendMode = Phaser.blendModes.MULTIPLY;            
        },

        update: function() {
            //player.angle = (game.input.activePointer.position.x / 400);
            guncross.position.copyFrom(game.input.activePointer.position);
            updateShadowTexture();
           // game.physics.arcade.moveToPointer(guncross, 60, game.input.activePointer, 200);
            //game.physics.arcade.moveToPointer(lightSprite, 60, game.input.activePointer, 200);
        }

    });

    function shoot(pointer) {

        var alzakObject = app.assets.alzak,
            alzak = alzakObject.shape,
            alzakWidth = alzak.texture.width,
            alzakHeight = alzak.texture.height;

        if(pointer.x > alzak.position.x && pointer.x <  alzak.position.x + alzakWidth && pointer.y > alzak.position.y && pointer.y <  alzak.position.y + alzakHeight) {
            alzakObject.kill();
            app.config.speed += 50;
        }

    }
    
    function updateShadowTexture() {
        // This function updates the shadow texture (shadowTexture).
        // First, it fills the entire texture with a dark shadow color.
        // Then it draws a white circle centered on the pointer position.
        // Because the texture is drawn to the screen using the MULTIPLY
        // blend mode, the dark areas of the texture make all of the colors
        // underneath it darker, while the white area is unaffected.

        // Draw shadow
        shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
        shadowTexture.context.fillRect(0, 0, app.game.width, app.game.height);

        // Draw circle of light with a soft edge
        var gradient = shadowTexture.context.createRadialGradient(
            app.game.input.activePointer.x, app.game.input.activePointer.y, LIGHT_RADIUS * 0.75,
            app.game.input.activePointer.x, app.game.input.activePointer.y, LIGHT_RADIUS);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        shadowTexture.context.beginPath();
        shadowTexture.context.fillStyle = gradient;
        shadowTexture.context.arc(app.game.input.activePointer.x, app.game.input.activePointer.y,
            LIGHT_RADIUS, 0, Math.PI*2);
        shadowTexture.context.fill();

        // This just tells the engine it should update the texture cache
        shadowTexture.dirty = true;
    }

}(this, this.app || {}, this.Phaser));