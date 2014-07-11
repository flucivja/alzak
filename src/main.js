(function(window, app, Phaser) {

    'use strict';

    window.app = app;

    app.assets = app.assets || {};
    app.states = app.states || {};    
    app.layers = app.layers || {};
    
    // create canvas for game
    app.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    app.config = {
        speed: 150
    };

    app.createAsset = function(name, parent) {
        var obj = Object.create(parent);
        app.assets[name] = obj;
        return obj;
    };
    
    app.createState = function(name, parent) {
        var obj = Object.create(parent);
        app.states[name] = obj;
        return obj;
    };
    
    app.layer = function(name, zindex) {
        var layer;
        layer = app.layers[name];
        if(layer === undefined) {
            layer = app.layers[name] = app.game.add.group();
        }
        
        layer.z = zindex === undefined ? layer.z : zindex;
        
        return layer;
    };

    app.callAssetsMethod = function(methodName) {
        var assetName, asset;

        for(assetName in app.assets) {
            asset = app.assets[assetName];
            if(typeof asset[methodName] === 'function') {
                asset[methodName]();
            }            
        }
    };
    
    app.run = function(state) {
        app.game.state.add(state, app.states[state], true);
    };

}(this, this.app || {}, this.Phaser));