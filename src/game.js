(function(Phaser) {

    'use strict';
    
    var alzak,
        player,
        guncross,
        blood,
        score = 0,
        scoreText,
        speed = 150;
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {
        
        game.load.image('alzak', '/img/alzak_min.png');
        game.load.image('guncross', '/img/gun_cross_min.png');
        game.load.image('shotgun', '/img/shotgun_min.png');
        game.load.image('blood', '/img/blood_min.png');
        
    }

    function create() {

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '12px', fill: '#fff' });
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        alzak = game.add.sprite(game.world.centerX, game.world.centerY, 'alzak');
        game.physics.arcade.enable(alzak);

        guncross = game.add.sprite(game.world.centerX, game.world.centerY, 'guncross');
        guncross.anchor.set(0.5);
        game.physics.arcade.enable(guncross);
        
        player = game.add.sprite(game.world.width - 280, game.world.height - 125, 'shotgun');
        game.physics.arcade.enable(player);
              
        game.input.onDown.add(kill, window);       
        
    }

    function update() {

        guncross.position.copyFrom(game.input.activePointer.position);

        if(alzak.timeout === undefined) {
            move();
            alzak.timeout = setTimeout(function() {
                move();
                clearTimeout(alzak.timeout);
                alzak.timeout = undefined;
            }, 500);
        }        

        if(alzak.position.x > game.world.width - alzak.texture.width) {
            alzak.body.velocity.x = -speed;
        } else if(alzak.position.x < 0) {
            alzak.body.velocity.x = +speed;
        }

        if(alzak.position.y > game.world.height - alzak.texture.height) {
            alzak.body.velocity.y = -speed;
        } else if(alzak.position.y < 0) {
            alzak.body.velocity.y = +speed;
        } 

        player.angle = (game.input.activePointer.position.x / 400); 
        
    }

    function move() {
        var rand;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.y = rand > 500 ? +speed : - speed;
        rand = Math.floor(Math.random() * 1000);
        alzak.body.velocity.x = rand > 500 ? +speed : - speed;
    }
    
    function render () {

    }
    
    function kill(pointer) {
        
        var alzakWidth = alzak.texture.width,
            alzakHeight = alzak.texture.height,
            playerHeight = player.texture.height;

        if(pointer.x > alzak.position.x && pointer.x <  alzak.position.x + alzakWidth && pointer.y > alzak.position.y && pointer.y <  alzak.position.y + alzakHeight) {
            alzak.kill();
            var newX = game.world.randomX, 
                newY = game.world.randomY;
            if(newX > game.world.width - alzakWidth) {
                newX = game.world.width - alzakWidth;
            } else if(newX < 0) {
                newX = 0;
            }
            
            if(newY > game.world.height - alzakHeight - playerHeight) {
                newY = game.world.height - alzakHeight - playerHeight;
            } else if(newY < 0) {
                newY = 0;
            }
            
            var blood = game.add.sprite(alzak.position.x, alzak.position.y, 'blood');
            blood.lifespan = 2000;
            alzak.reset(newX, newY);
            alzak.bringToTop();
            if(alzak.timeout !== undefined) {
                clearTimeout(alzak.timeout);
                alzak.timeout = undefined;
            }

            speed += 50;
            

            guncross.bringToTop();
            player.bringToTop();
            
            score += 1;
            scoreText.text = 'Score: ' + score;
  
        }

    }

}(window.Phaser));