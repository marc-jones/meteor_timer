// Phaser current version test environment
// Simple countdown timer

window.onload = function() {

    var game = new Phaser.Game(600, 400, Phaser.AUTO, 'meteor-timer', null,
            false, false);

    var Timer = function(game) {};

    Timer.Boot = function(game) {};

    
    var timer, timerEvent, altitude_zone;

    Timer.Boot.prototype = {
        
        preload: function() {
            game.load.spritesheet('overkill', 'assets/img/overkill.png', 80, 40);
        },

        create: function() {
            // Create a custom timer
            timer = game.time.create();
            
            // Create a delayed event 1m and 30s from now
            timerEvent = timer.add(Phaser.Timer.MINUTE * 5, this.endTimer, this);
            
            for (i = 1; i < 5; i++) {
                timer.add(Phaser.Timer.MINUTE * i, this.reduce_altitude, this);
            }
            
            // Start the timer
            timer.start();
            
            altitude_zone = 5;
            
            // button(x, y, key, callback, callbackContext,
            //        overFrame, outFrame, downFrame, upFrame, group)
            button = game.add.button(300, 200, 'overkill', this.reduce_altitude, this, 2, 1, 0);
        },

        update: function() {
                
        },
        
        render: function() {
            // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            if (timer.running) {
                game.debug.text(altitude_zone + ' ' + this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
            }
            else {
                game.debug.text("Done!", 2, 14, "#0f0");
            }
        },

        endTimer: function() {
            // Stop the timer when the delayed event triggers
            timer.stop();
        },

        formatTime: function(s) {
            // Convert seconds (s) to a nicely formatted and padded time string
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);   
        },

        reduce_altitude: function() {

            altitude_zone = altitude_zone - 1;

        }
        
    };
    
    game.state.add('Boot', Timer.Boot);
    game.state.start('Boot');
    
};