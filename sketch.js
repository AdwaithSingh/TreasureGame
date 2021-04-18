var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

var coinSound, knifeStabSound;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  coinSound = loadSound("Bag-of-Coins-A-www.fesliyanstudios.com.mp3");
  knifeStabSound = loadSound("SF-finger-cut-whoosh1.mp3")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,40);
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      coinSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      coinSound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+50;
      coinSound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        knifeStabSound.play();
        boy.addAnimation("SahilRunning", endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=1;
       
        swordGroup.destroyEach();
        cashG.destroyEach();
        cashG.setVelocityYEach(0);
        diamondsG.destroyEach();
        diamondsG.setVelocityEach(0);
        jwelleryG.destroyEach();
        jwelleryG.setVelocityEach(0);
      }
  }

  drawSprites();
  textSize(20);
  fill("orange");
  text("Treasure: "+ treasureCollection,270,30);
  }
  
  if(gameState === END){
    console.log("game over");
    if(mousePressedOver(boy)){
      gameState = PLAY;
      boy.addAnimation("SahilRunning",boyImg)
      boy.x=70;
      boy.y=540;
      boy.scale=0.08;
      boy.setCollider("circle",0,0,40);
      treasureCollection=0;
    }
  }
  
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50,width -50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 310;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50,width -50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 310;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50,width -50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 310;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width -50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 310;
  swordGroup.add(sword);
  }
}