var bg,bgImg;
var thief, thief1_img, thief2_img;
var coin, coin_img, diamond, diamond_img;
var officer, officer_img, handcufffs, handcuffs_img;
var heart1_img,heart2_img,heart3_img;
var obstaclesGroup, rewardsGroup;
var gameState = "play";
var heart1,heart2,heart3;
var heart = 3;
var topEdge;
var bottomEdge;
var score = 0;
var restart,restart_img;
var win;
var lose;
var explosion;


function preload(){
  
  thief1_img = loadImage("assets/thief1.png")
  thief2_img = loadImage("assets/thief2.png")
  coin_img = loadImage("assets/coin.png")
  diamond_img = loadImage("assets/diamond.png")
  officer_img = loadImage("assets/officer.png")
  handcuffs_img = loadImage("assets/handcuffs.png")
  bgImg = loadImage("assets/bg.jpg")
  heart1_img = loadImage("assets/heart_1.png")
  heart2_img = loadImage("assets/heart_2.png")
  heart3_img = loadImage("assets/heart_3.png")
  restart_img = loadImage("assets/rb.png")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosion = loadSound("assets/explosion.mp3")

}

function setup() {

  obstaclesGroup = new Group();
  rewardsGroup = new Group();

  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 2.35
  

//creating the player sprite
thief = createSprite(displayWidth-1120, displayHeight-410, 50, 50);
 thief.addImage(thief1_img)
   thief.scale = 0.25
   thief.debug = true
   thief.setCollider("rectangle",0,0,300,300)

 heart3 = createSprite(1000,85,20,20);
 heart3.addImage(heart3_img);
 heart3.scale = 0.2;
 heart3.visible = true;

 heart1 = createSprite(1000,85,20,20);
 heart1.addImage(heart1_img);
 heart1.scale = 0.2
 heart1.visible = false;

 heart2 = createSprite(1000,85,20,20);
 heart2.addImage(heart2_img);
 heart2.scale = 0.2
 heart2.visible = false;

restart = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
restart.addImage(restart_img);
restart.scale = 0.2;
restart.visible = false;
}


function draw() {
  background(0); 
  
  
if(gameState === "play"){
 
  if(keyDown("UP_ARROW")||touches.length>0){
    thief.y = thief.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   thief.y = thief.y+30
  }
  if(rewardsGroup.isTouching(thief)){
    for(var i = 0; i<rewardsGroup.length ;i++){
      if(rewardsGroup[i].isTouching(thief)){
        rewardsGroup[i].destroy();
          score= score + 5
          win.play();
      }
    }
  }

if(obstaclesGroup.isTouching(thief)){
  for(var i = 0; i<obstaclesGroup.length ;i++){
    if(obstaclesGroup[i].isTouching(thief)){
      obstaclesGroup[i].destroy();
      lose.play();
      heart = heart -1;
      if(heart === 2){
        heart2.visible = true;
        heart3.visible = false;
        heart1.visible = false;
      }
      if(heart === 1){
        heart1.visible = true;
        heart2.visible = false;
        heart3.visible = false;
      }
    }
  }
}
SpawnObstacles();
SpawnRewards();
}


topEdge = createSprite(displayWidth-1120,displayHeight-800,40,40);
bottomEdge = createSprite(displayWidth-1120,displayHeight-130,40,40)
thief.bounceOff(topEdge);
thief.bounceOff(bottomEdge);

drawSprites();

textSize(20);
fill("black")
text("Score: " + score,950,50);



if(heart === 0){
  gameState = "end";
}
if(score >= 20){
  gameState = "win";
}
if(gameState === "end"){
  stroke("red");
  strokeWeight(4);
  fill("blue");
  textSize(70);
  text("Game Over",550,240)
  obstaclesGroup.destroyEach();
  rewardsGroup.destroyEach();
  thief.destroy();
  heart1.visible = false;
  heart2.visible = false;
  heart3.visible = false;
  restart.visible = false;
  /*if(mousePressedOver(restart)){
    gameState = "play";
  } */
}
else
if(gameState === "win"){
  stroke("red");
  strokeWeight(4);
  fill("blue");
  textSize(70);
  text("You Won",550,300);
  obstaclesGroup.destroyEach();
  rewardsGroup.destroyEach();
  thief.destroy();
}
}
function SpawnObstacles(){

  if(frameCount % 80 === 0){
    officer = createSprite(random(1050,1200),random(200,575),20,20)
    handcuffs = createSprite(random(900,1200),random(100,500),20,20)
    officer.addImage(officer_img);
    handcuffs.addImage(handcuffs_img);
    officer.scale = 0.6;
    handcuffs.scale = 0.3;
    officer.velocityX = -6
    handcuffs.velocityX = -8;
    officer.lifetime = 300;
    handcuffs.lifetime = 300;
    obstaclesGroup.add(handcuffs);
    obstaclesGroup.add(officer);
  }
}

function SpawnRewards(){

  if(frameCount % 120 === 0){
    coin = createSprite(random(1050,1200),random(200,575),20,20)
    diamond = createSprite(random(900,1200),random(100,500),20,20)
    coin.addImage(coin_img);
    diamond.addImage(diamond_img);
    coin.scale = 0.2;
    diamond.scale = 0.15;
    coin.velocityX = -4
    diamond.velocityX = -6;
    coin.lifetime = 300;
    diamond.lifetime = 300;
    rewardsGroup.add(coin);
    rewardsGroup.add(diamond);
  }
}

/*function reset(){
  gameState = "play";
  restart.visible = false;
  score = 0;
}
*/