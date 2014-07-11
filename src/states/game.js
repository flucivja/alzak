(function(app, Phaser) {

	'use strict';

	var score = 0,
        scoreText;

	app.createState('game', {

        preload: function() {
            app.callAssetsMethod('preload');    
        },

        create: function() {         
            app.game.physics.startSystem(Phaser.Physics.ARCADE);
            app.callAssetsMethod('create');    
        },

        update: function() {
            app.callAssetsMethod('update');
        },

        render: function() {
            app.callAssetsMethod('render');
        }

	});
    
}(this.app || {}, this.Phaser));