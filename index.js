var buttonColors=["red","yellow","green","blue"];

var gamePattern=[];
var userPattern=[];

var randomColor;
var started=false;
var level=0;

$(document).keypress( function(){
        if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started=true;
    }
        
});

$(".btn").click(function(event){
    var userChosenColor=event.currentTarget.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length-1);

});

function playSound(name){
    var audio= new Audio();
    audio.src = "sounds/"+name+".mp3";
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel]===gamePattern[currentLevel]){
        if(userPattern.length===gamePattern.length){
            
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            level = 0;
            gamePattern = [];
            started = false;
    }
}



function newSequence(){
        userPattern=[];
        level++;
        $("#level-title").text("Level "+level);
        var randomNumber=Math.round(Math.random()*3);
        randomColor=buttonColors[randomNumber];
        gamePattern.push(randomColor);
        $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);        

}



