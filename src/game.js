(function(game, Phaser) {

    'use strict';

    window.game = game;

    game.assets = game.assets || {};

    game.config = {
        speed: 150
    };

    game.create = function(name, parent) {
        var obj = Object.create(parent);
        game.assets[name] = obj;
        return obj;
    };

    game.callAssetsMethod = function(methodName) {
        var assetName, asset;

        for(assetName in game.assets) {
            asset = game.assets[assetName];
            if(typeof asset[methodName] === 'function') {
                asset[methodName]();
            }            
        }
    };

    game.scene = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {
        game.callAssetsMethod('preload');    
    }

    function create() {
        game.scene.physics.startSystem(Phaser.Physics.ARCADE);
        game.callAssetsMethod('create');    
    }

    function update() {
        game.callAssetsMethod('update');
    }
    
    function render () {
        game.callAssetsMethod('render');
    }     

}(window.game || {}, window.Phaser));