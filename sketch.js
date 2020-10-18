var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var player,player_running;
var backimage;
var bananaGroup, bananaImage,banana;
var rockGroup, rockImage,rock ;
var score;
var ground, invisibleGround;
var monkeystop;

function preload() {
  backimage = loadImage("jungle.jpg");
  player_running=loadAnimation("test.png");
  player_running  = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeystop = loadImage("monkeys.png")
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("stone.png");
}  

function setup() {
  createCanvas(600,400);
   backg=createSprite(200,200)
  backg.addImage(backimage)
  //text("Score: "+ score, 500,50);
  player=createSprite(50,380,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
 
  
  ground = createSprite(400,390,1600,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  bananaGroup = new Group();
  rockGroup = new Group();
}

function draw() {
 
  background (255);  
  
  if(gamestate === PLAY){
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")) {
      player.velocityY = -10;
    }

    player.velocityY = player.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnBanana();
    spawnRock();
    
    if (rockGroup.isTouching(player)){
     player.scale = 0.001 
     gamestate = END;
    }  
  }
  else if (gamestate === END) {
    
   ground.velocityX = 0;
   player.velocityY = 0;
    
   rockGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
    
   rockGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);

  }
  
  player.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gamestate = PLAY
  
  ground.velocityX = -6;
 
  player.changeAnimation("running",player_running);
  score = 0
  rockGroup.destroyEach();
  bananaGroup.destroyEach();
  
 
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(260,290));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 300;
    bananaGroup.add(banana)
  }
}

function spawnRock() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,375,10,40);
    rock.addImage(rockImage);
    rock.velocityX = -4;
    rock.scale = 0.1;
    rock.lifetime = 300;
    rockGroup.add(rock)
    }
  }
