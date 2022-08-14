const WORKTIME = 20;
var BREAKTIME = 5;
var BIGBREAKIE = 25;

var seconds = 0;
var interval;
var timer = 0;
var start = true;
var round = 0;
var progress = $(".box-container").children();
var titleInt;
var pauseTime = 0 ;

/* Thoughts moving forward: 
       Make the interface fill the availale screen

       add borders to the buttons
       border animations maybe

       reset button

       animation switchboard function
        
*/
function pomodoro(mins) {
    // Time Keeping Conditionals
    
    if(pauseTime > 0){
        timer = pauseTime
    } else {
        timer = mins * 60;
    }
    
    
    if(timer % 60 > 0){
        seconds = timer % 60;
    } else {
        seconds = 60;
    }
    
    
    if((timer/60) < mins){
        minutes = Math.floor(timer/60)
    } else {
        minutes = Math.floor((timer/60) - 1);
    }
    // 

    // Time Keeeping Function
    interval = setInterval(function() {
        if(!start){
            clearInterval(interval);
            pauseTime = timer
            return
        }
            seconds--;
            timer--;
            
            $("#timer").text( minutes + ":" + seconds);


            if (!seconds){ 
                $("#timer").text(minutes + ":0" + seconds);
                seconds = 60;
                minutes--;
            } else if(seconds < 10 && mins < 10){
                $("#timer").text("0"+ minutes + ":0" + seconds);
            } else if (seconds < 10){
                $("#timer").text(minutes + ":0" + seconds);
            } else if (mins <10){
                $("#timer").text("0"+ minutes + ":" + seconds);
            }

            if(!timer){
                titleInt = setInterval(function(){
                    if($("title").text().includes("Pomodoro")){
                        $("title").text("Sessions Over!")
                    } else {
                        $("title").text("Pomodoro Round " + (round + 1))
                    }
                },1000)
                clearInterval(interval)
                
            }
            }
            , 1000);
    //

//// Animations ///

     // Animate Progress Bars
     $(progress[round]).animate({
        height: "2.3rem",
        width: "5rem",
        fontSize: "1.5rem",
    }, "slow");
    $(progress[round]).animate({
        height: "2rem",
        width: "5rem"
    }, "fast");
    

    // animate bouncing letter box
    tAnimation = setInterval(function() {
        
        $(progress[round]).animate({
            bottom: "1rem",
            
        }, "slow");
        $(progress[round]).animate({
            height: "1.8rem",
            bottom: "0rem"
        }, "fast");
        $(progress[round]).animate({
            height: "2rem",
        }, "fast");
    },5000) 
} // end pomodoro function

      // ending animation
function finished(){
    if(round > 7){
        for(var i = 0; i < progress.length; i++){
            
            $(progress[i]).addClass("animated")
         
        }
        
        $("#timer").text("Finished!")
    } else {
        console.log("round " + round )
    }}

     //
////////


function count(round) {
    if(round % 2 == 0 && round < 7){
        pomodoro(WORKTIME)
    } else if(round < 7){
        pomodoro(BREAKTIME)
    } else if(round === 7){
        pomodoro(BIGBREAKIE)
    } else {
        finished()
    }}




$("#start").on("click", function(){
    start = true;
    count(round);
    $(this).prop("disabled", true);
    $("#stop").prop("disabled", false);
})


$("#stop").on("click", function(){
    start = false;
    
    clearInterval(titleInt);
    clearInterval(tAnimation)
    
    $("#stop").prop("disabled", true);
    $("#start").prop("disabled", false);
})

$("#next").on("click", function() {
    start = true;
    clearInterval(titleInt);
    clearInterval(interval);
    pauseTime = 0;
    round++;
    count(round)
    clearInterval(tAnimation);
    
    

    $("title").text("Pomodoro Round " + (round + 1));
    $("#stop").prop("disabled", false);
    $("#start").prop("disabled", true);
})





