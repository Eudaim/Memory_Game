var buttonColor  = ["red", "green", "blue", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function(){
    if(!start)    
    {   
        start = true;
        nextSequence();
    }
});
$(".btn").click(function(event){
    if(start == true)
    {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animationPress(userChosenColor);
        playSound(userChosenColor);
        checkUserClicks(userClickedPattern.length - 1); 
    }
}); 

function playSound(color)
{
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function nextSequence ()
{ 
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColor[randomNumber]; 
    gamePattern.push(randomColor);
    showSequence();
    playSound(randomColor); 
    level++;
    $("#level-title").text(`Level ${level}`);
}
function showSequence()
{   
    var currentColor = gamePattern[level];     
    $("#" + currentColor).fadeOut().fadeIn();
}

function animationPress(color)
{
    $(`.${color}`).addClass("pressed");
    setTimeout(function(){
        $(`.${color}`).removeClass("pressed");
    },100);
}
function checkUserClicks(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    { 
        if(userClickedPattern.length === gamePattern.length)
            setTimeout(function(){nextSequence()},700);
    }
    else
    {
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 100); 
        playSound("wrong");
        $("#level-title").text("GAME OVER. Press A Key to Restart.");
        startOver();
    }
}
function startOver()
{
    level = 0; 
    gamePattern = []; 
    start = false;
    
}
console.log(userClickedPattern);
console.log(gamePattern);