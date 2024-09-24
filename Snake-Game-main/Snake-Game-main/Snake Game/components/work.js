let inputDir={x:0, y:0};
const foodSound=new Audio("../music/food.mp3");
const moveSound=new Audio("../music/move.mp3");
const musicSound=new Audio("../music/music.mp3");
const gameOverSound=new Audio("../music/gameover.mp3");
let speed=10;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
let food={x:6,y:7};
let score=0;

//Game Functions
function main(ctime){
    //the window requestAnimation frame 
    //fires the function main and inside this function we then
    //fires the requestanimationframe
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000< (1/speed))
    {
        return;
    }
    lastPaintTime=ctime;

    gameEngine();

}

function isCollide(snake){
    //if snake touches itself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snake[0].x &&snakeArr[i].y===snake[0].y){
            return true;
        }
    }
    //if snake touches the wall
    if(snake[0].x>=18 || snake[0].x<=0 ||snake[0].y>=18 || snake[0].y<=0)
    {
        return true;
    }

    return false;
}
function gameEngine(){
    //Updating the snake variable array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
//alert("Game Over. Press ANY Key To Play Again");
        window.location.href = "gameover.html";
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //If snake have eaten the food increment the score and
    //regenrate the score
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        score+=1;
        if(score>hiScoreVal)
        {
            hiScoreVal=score;
            localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML="Hi Score: "+hiScoreVal;
        }
        scoreBox.innerHTML="Score: "+score;
        localStorage.setItem("Score",JSON.stringify(score));
        foodSound.play();
        //adding the element to front of the snakeArr
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+
        inputDir.y});
        //Math.random gives random no. beteewn 0 and 1
        //2+Math.round(a+(b-a))
        let a=2;
        let b=15;
        food={x:2+Math.round(a+(b-a)*Math.random()),y:2+Math.round(a+(b-a)*Math.random())};
    }

    //Moving the Snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        //we are updating snake arr[i+1] to snake array i
        //so we have to use spread operator
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

function soundmanagement(){
    console.log("YES");
}






    //Displaying the snake
    board.innerHTML="";
    snakeArr.forEach(function(ele,index){
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=ele.y;
        snakeElement.style.gridColumnStart=ele.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Dispalying the food
    foodElement=document.createElement("div");
    foodElement.style. gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}






// we need game loop to render the game file as whenever we play a game its frame need to be refresed everytime within
//seconds


//main logic starts here
//storing the hiscore in localstorage
let hiScore=localStorage.getItem("hiScore");
if(hiScore===null){
    hiscoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(0));
}
else{
    hiScoreVal=JSON.parse(hiScore);
    hiScoreBox.innerHTML="HiScore: "+hiScore;
}
let tsc=localStorage.getItem("score");



window.requestAnimationFrame(main);
window.addEventListener('click',function(event){
    console.log(event);
})
window.addEventListener('keydown',function(event){
    inputDir={x:0, y:1}  //start the game
    moveSound.play();
    switch(event.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:break;
    }
});
