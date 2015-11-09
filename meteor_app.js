$(document).ready(function(){
    d3.select('#stop')
      .classed('hidden', true);
    $('#start').on('click', function() {
        d3.select('#start')
          .classed('hidden', true)
          .classed('visible', false);
        d3.select('#stop')
          .classed('visible', true)
          .classed('hidden', false);
        startTimer();
    })
});


function startTimer(){

    altitude_zone = 5;
    mins = 5;
    secs = 0;
    minute_length = 60
    
    game_over = false;
    paused = false;
    total_time = minute_length * 5;
    last_sec_elapsed = -1;
    altitude_zone += 1;
    paused_time = 0;
    unpaused_time = 0;
    
    alt_span = d3.select('#altitude');
    min_span = d3.select('#mins');
    sec_span = d3.select('#secs');
    d3.timer(count);
    
    
    function count(msElapsed) {
        if (paused)
        {
            paused_time = msElapsed - unpaused_time;
        } else {
            unpaused_time = msElapsed - paused_time;           
        }
        
        var secs_elapsed = Math.floor(unpaused_time/1000);
        if (secs_elapsed != last_sec_elapsed) {
            last_sec_elapsed = secs_elapsed;
            min_span.html(pad_time(Math.floor((total_time-secs_elapsed)/minute_length)));
            sec_span.html(pad_time((total_time-secs_elapsed)%minute_length));
            if ((total_time-secs_elapsed)%minute_length == 0) {
                reduce_altitude_zone();
            };
        };
        return(game_over);
    };
    
    $('#overkill').on('click', function() {
        reduce_altitude_zone();
    })

    $('#pause').on('click', function() {
        paused = !paused;
        if (paused) {
            d3.select('#pause')
              .html('UNPAUSE');
        } else {
            d3.select('#pause')
              .html('PAUSE');            
        }
    })
    
    $('#stop').on('click', function() {
        $('#overkill').off('click');
        $('#pause').off('click');
        d3.select('#stop')
          .classed('hidden', true)
          .classed('visible', false);
        d3.select('#start')
          .classed('visible', true)
          .classed('hidden', false);
          
        end_game();
    })
    
    function pad_time(number) {
        var s = '0' + number;
        return(s.substr(s.length-2));
    };
    
    function end_game() {
        game_over = true;
        alt_span.html('GAME OVER!');
    };
    
    function reduce_altitude_zone() {
        altitude_zone -= 1;
        if (altitude_zone <= 0) {
            end_game();
        } else {
            alt_span.html(altitude_zone);
        };        
    };
};