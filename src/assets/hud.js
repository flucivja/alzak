(function(app, Phaser) {

	'use strict';

	var score = 0,
        scoreText,
        game = app.game;

	app.createAsset('hud', {

        increaseScore: function() {
            score += 1;
            scoreText.text = 'Score: ' + score;
        },

		create: function() {
            var hudLayer = app.layer('hudLayer', 99);
            scoreText = new Phaser.Text(game, 16, 16, 'Score: ' + score, { fontSize: '8px', fill: '#000' });
            hudLayer.add(scoreText);
            //scoreText = game.add.text();
		}

	});

}(this.app || {}, this.Phaser));