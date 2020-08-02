var sequenceList = [];
var userSequenceList = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var level = 0;
var sequenceCounter = 0;

$(".btn").click(function(event){

    $(event.target).fadeOut(80).fadeIn(80);
    playSound(event.target.id);

    

    //store selected box color
    selectedBox = buttonColors.indexOf(event.target.id);
    userSequenceList.push(selectedBox);

    //animate user press
    animatePress(event.target.id);


    console.log("User Input: " + userSequenceList);

    testUserInput(userSequenceList.length-1);

});

$(document).on("keypress", function(event){
    if (event.originalEvent.key === "a"){
        leveler();
    }
});

function randomSequence(){
    var randomNumber = Math.floor(Math.random() * 4);

    //push a random number in the sequence list
    sequenceList.push(randomNumber);

    level++;
    
    //display level
    $("#level-title").text("Level " + level);
}


function leveler(){

    userSequenceList = [];

    randomSequence();

    //play sequence on the boxes together with sounds
    setTimeout(function(){

        console.log("sequenceCtr: "+ sequenceCounter);

        $("#" + buttonColors[sequenceList[sequenceCounter]]).fadeOut(100).fadeIn(100);
        playSound(buttonColors[sequenceList[sequenceCounter]]);
        sequenceCounter++;

    }, 1000);
    

    console.log("Random Seq: " + sequenceList);

}

function testUserInput(currentLevel){


    if (sequenceList[currentLevel] === userSequenceList[currentLevel]){
        console.log("correct");
        
        if(userSequenceList.length === sequenceList.length){
            
            setTimeout(function(){
                leveler();
            }, 1000);
            
        }

    } else {
        gameOver();
        startOver()
    }

}

function animatePress(color){
    $("#" + color).addClass("pressed");
    
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 300);
}

function playSound(color){
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function gameOver(){

    playSound("wrong");
    $("body").addClass("game-over");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over!");

}

function startOver(){
    setTimeout(function(){
        playSound("wrong");
        location.reload(true);
    }, 2000);
}