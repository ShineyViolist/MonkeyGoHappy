//Global Variables

//Images
var bananaImage,obstacleImage,monkeyImage,bgImage;

//Sprites & Score
var player,bg,bananas,obstacles,score,ground,heart1,heart2,heart3;

var gameOverImage, restartImage;

var grav = 0.5;

var lives = 2;

score = 0;

var gameState = "play";

function preload(){
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("log.png");
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bgImage = loadImage("jungle.jpg");
  heartImage = loadImage("heart.png");
  gone = loadImage("gone.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  
  //Create Sprites
  bg = createSprite(400,0,200,20);
  bg.addImage(bgImage);
  bg.scale = 1.5;
  bg.velocityX = -5;
  
  player = createSprite(50,250,20,20);
  player.addAnimation("monkeyMove",monkeyImage);
  player.scale = 0.12;
  
  bananas = new Group();
  
  obstacles = new Group();
  
  ground = createSprite(150,333,900,100);
  ground.visible = false;
  
  heart1 = createSprite(400,50,20,20);
  heart1.addAnimation("alive",heartImage);
  heart1.addAnimation("broken",gone);
  heart1.scale = 1.5;
  
  heart2 = createSprite(430,50,20,20);
  heart2.addAnimation("alive",heartImage);
  heart2.addAnimation("broken",gone);
  heart2.scale = 1.5;
  
  gameOver = createSprite(300,100,20,20)
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,150,20,20)
  restart.addImage(restartImage);
  restart.scale = 0.8
  restart.visible = false;
}


function draw(){
  background(255);
  
  if(gameState == "play"){  
    
  gameOver.visible = false;
  
  restart.visible = false;
   
  bg.velocityX = -5;
    
  if(World.frameCount%90 == 0){
    if(Math.round(random(1,2)) == 1){
      spawnBananas();
    }else{
      spawnObstacles();
    }
  }
  
  for(var i = 0; i<=bananas.length; i++){
    if(player.isTouching(bananas)){
       bananas.get(i).destroy();
       score++;
       }
    }
  } 
 
  for(var g = 0; g<=obstacles.length; g++){
    if(player.isTouching(obstacles)){
      if(lives == 2){
        heart1.changeAnimation("broken");
        player.scale = 0.12;
        obstacles.remove(obstacles.get(g));
      }
      if(lives == 1){
        heart2.changeAnimation("broken");
        gameState = "lose";
      }
      lives--;
    }
  } 
  
  if(keyDown("space") && player.y >= 246){
    player.velocityY = -12; 
  }
  
  player.velocityY = player.velocityY + grav;
  
  if(bg.x < -149){
    bg.x = bg.width/2;
  }
    player.collide(ground);
  
  switch(score){
          case 5: player.scale = 0.14; 
                   break;
          case 10: player.scale = 0.16;
                   break;
          case 15: player.scale = 0.18;
                  break;
          case 20: player.scale = 0.20; 
                   break;
         default: break;
  }
  if(gameState == "lose"){
    restart.visible = true;
    gameOver.visible = true;
    
    player.velocityY = 0;
    
    bg.velocityX = 0;
    
    obstacles.setVelocityXEach(0);
    
    bananas.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
      score = 0;
      gameState = "play";
      obstacles.destroyEach();
      bananas.destroyEach();
      heart1.changeAnimation("alive",heartImage);
      heart2.changeAnimation("alive",heartImage);
      lives = 2;
    } 
  }
    
  player.collide(ground);
  
  drawSprites();

  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
}

function spawnObstacles(){
  obstacle = createSprite(650,250,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5;
  obstacles.add(obstacle);
}

function spawnBananas(){
   banana = createSprite(650,250,20,20); 
   banana.addImage(bananaImage);
   banana.scale = 0.05;
   banana.velocityX = -5;
   bananas.add(banana);
}