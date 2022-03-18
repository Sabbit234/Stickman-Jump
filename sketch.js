var backgroundImg, bg;
var dotImg, dot, dotsGroup;
var platformImg, platform, platformsGroup;
var player, playerImg;
var invisiblePlatformGroup, invisiblePlatform;
var gameState = "play"

function preload(){
  backgroundImg = loadImage("Background.png");
  dotImg = loadImage("Dot.png");
  platformImg = loadImage("Platform6.png");
  playerImg = loadImage("Player.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg = createSprite(width/2,300);
  bg.addImage("Background", backgroundImg);
  bg.velocityY = 1;
  bg.scale = 2;

  dotsGroup = createGroup();
  platformsGroup = createGroup();
  platformsGroup2 = createGroup();

  player = createSprite(width/2, height/2);
  player.addImage(playerImg);
  player.scale = 0.05;

}

function draw() {
  background(200);
  


  
if (gameState === "play") {
  spawnDots();

  if (keyIsDown (RIGHT_ARROW)) {
    player.x = player.x + 3;
  }

  if (keyIsDown (LEFT_ARROW)) {
    player.x = player.x - 3;
  }

  if (keyDown ("space")) {
    player.velocityY = -5
  }

  player.velocityY = player.velocityY + 0.8;

  if(bg.y > 400){
    bg.y = 300
    }

if (player.isTouching(platformsGroup)) {
    player.velocityY = 0
}

if (player.isTouching(platformsGroup2)) {
    player.destroy();
  gameState = 'end';
  
 }
 drawSprites();
}
if (gameState === "end"){
  fill ("red");
  textSize(50);
 text("Game Over", width/2, height/2)

}
}


function spawnDots() 
{
  if (frameCount % 200 === 0) {
     var  dot = createSprite (random(width/2 - 500,width/2 + 500 ), 0)
     dot.addImage(dotImg);
     dot.scale = 0.02;
     dot.velocityY = 1;


     dot.lifetime = 1000;
     
     dotsGroup.add(dot)

     var platform = createSprite (dot.x , dot.y + 100);
     platform.addImage(platformImg);
     platform.scale = 0.08;
     platform.velocityY = 1;
    


     platform.lifetime = 1000;
     dot.depth = player.depth;
     player.depth = player.depth + 1;
    
    platformsGroup.add(platform)

    var  platform2 = createSprite(dot.x , dot.y + 200, platform.width, 10);
     platform2.visible = true;
     platform2.velocityY = 1;
     platform2.scale = 0.2;
    platformsGroup2.add(platform2)
    }


}