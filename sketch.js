//variables
var Play = 1;
var End = 0;

var gameover,gameOver
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = Play;

//preloading the images
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOver = loadImage("gameover.png");
  Restart = loadImage("restart.png")
  
  
 
}



function setup() {
  createCanvas(400,400)
  score = 0;
  ground = createSprite(200,380,400,10)
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("monkey running",monkey_running)
  monkey.scale=0.1;
  gameover = createSprite(200,200,10,10);
  gameover.addImage("game over",gameOver)
  restart = createSprite(200,270,10,10);
  restart.addImage ("restart",Restart)
  restart.scale = 0.5;
  obstaclesGroup= new Group();
  bananaGroup = new Group();

  
}



function draw() {
  background("black");
  //if gameState = play
  if(gameState===Play){
    //jumping of monkey
    if(keyDown("space")&&monkey.y>343){
    monkey.velocityY=-17;
  }
   //gravity for monkry
  monkey.velocityY = monkey.velocityY+0.8;
  
  //banana function
  Spawnbanana();
  //obstacle function
  obstacles();
  //gameover image is not visible
  gameover.visible = false;
    restart.visible = false;
  }
  monkey.collide(ground);
  
    if(obstaclesGroup.isTouching(monkey)){
        
       
        gameState = End;
        
      
    }
  
   if (gameState === End) {
      gameover.visible = true;
     if(mousePressedOver(restart)){
     reset();
     }
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     
    banana.visible = false
     restart.visible = true;
     
    monkey.velocityY=0
   }
  if(bananaGroup.isTouching(monkey)){
  score = score+1;
  bananaGroup.destroyEach();
  }

  drawSprites();
  text("score : "+score,180,100);
  
}

function Spawnbanana(){
  if(frameCount%70===0){
  banana = createSprite(400,200,10,10)
  banana.addImage("banana image",bananaImage)
  banana.scale = 0.1;
  banana.velocityX = -6;
  banana.lifetime = 66.666
  bananaGroup.add(banana)
  }
  

}
function obstacles(){
  if(frameCount%70===0){
obstacle = createSprite(400,340,10,10);
obstacle.addImage("obstacle image",obstacleImage);
obstacle.velocityX=-6
obstacle.scale = 0.2;
obstacle.lifetime=66.666; obstacle.setCollider("rectangle",-40,0,400,400)
obstaclesGroup.add(obstacle)
}
  
}

function reset(){
gameState = Play;
obstaclesGroup.destroyEach();
bananaGroup.destroyEach();
score = 0
}




