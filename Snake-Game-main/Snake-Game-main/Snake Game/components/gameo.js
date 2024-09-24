const scrolling=new Audio("../music/food.mp3");
const clicking=new Audio("../music/move.mp3")
let var1=document.getElementById("HS");
let hi=localStorage.getItem("hiScore");


if(hi===null){
    localStorage.setItem("hiScore",JSON.stringify(0));
}
else{
    hiScoreVal=JSON.parse(hi);
    var1.innerHTML=hi;
}
let var2=document.getElementById("S");
let sc=localStorage.getItem("Score");
score=JSON.parse(sc);
var2.innerHTML=score;


document.addEventListener("click",function(){
    clicking.play();
})



