(function(game) {

	'use strict';

	var score = 0,
        scoreText,
        scene = game.scene;

	game.create('hud', {

        increaseScore: function() {
            score += 1;
            scoreText.text = 'Score: ' + score;
        },

		create: function() {
            scoreText = scene.add.text(16, 16, 'Score: ' + score, { fontSize: '12px', fill: '#fff' });
		}

	});

}(window.game || {}));