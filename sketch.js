var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleGroup;
var score=0;
var gameState="play";
var jumpSound;
function preload(){
bgImg = loadImage("assets/bg.png")
obstacle1=loadImage("assets/obsBottom1.png")
obstacle2=loadImage("assets/obsBottom2.png")
obstacle3=loadImage("assets/obsBottom3.png")
obstacle4=loadImage("assets/obsTop1.png")
obstacle5=loadImage("assets/obsTop2.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
dieSound=loadSound("assets/die.mp3");
jumpSound=loadSound("jump.wav");
}

function setup(){

//background image
bg = createSprite(195,495,2,2);
bg.addImage(bgImg);
bg.scale = 2

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
obstacleGroup=new Group();


}

function draw() {
  
  background("black");
  if (gameState==="play"){
  console.log(score);
  console.log(text);
  score=score+Math.round(frameCount/60);
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jumpSound.play();
          
          }
          balloon.velocityY = balloon.velocityY + 2;
          spwanObstacles();
          drawSprites();
if(obstacleGroup.isTouching(balloon)||balloon.y>490){
  console.log("gameEnd");
  gameState="end";
  }
}
  else if(gameState==="end"){
    background("black");
    fill("red");
    textSize(40);
    text("gameOver",150,200);
    fill("white");
    textSize(20);
    text("score:"+score,100,130);
    obstacleGroup.setVelocityXEach(-1);
    dieSound.play();
 
  }
          //adding gravity
        
}
function spwanObstacles(){
  if(frameCount%100===0){
  var obstacles=createSprite(300,300,20,30);
  obstacles.velocityX=-4;
  rand=Math.round(random(1,5));
  switch(rand){
  case 1 : obstacles.addImage(obstacle1);
           obstacles.scale=0.1;
           break;
  case 2 : obstacles.addImage(obstacle2);
           obstacles.scale=0.1;
           break;  
  case 3 : obstacles.addImage(obstacle3);
           obstacles.scale=0.1;
           break;       
  case 4 : obstacles.addImage(obstacle4);
           obstacles.scale=0.1;
           break;
  case 5 : obstacles.addImage(obstacle5);
           obstacles.scale=0.1;
           break;
  default: break;        
  }
  obstacles.lifetime=200;
  obstacleGroup.add(obstacles);
}
}