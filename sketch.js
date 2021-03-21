var tower , towerImage ;
var door , doorImage , doorsGroup ;
var climber, climberImage, climberGroup 
var ghost, ghostImage ;
var invisibleBlockGroup , invisibleBlock ;
var gameState = "play" ;
function preload() {
  towerImage = loadImage("tower.png");
doorImage =  loadImage("door.png") ;
climberImage = loadImage("climber.png")
ghostImage = loadImage("ghost-standing.png") ;
  // spooky sound 
  spooky = loadSound("spooky.wav"); 
}
function setup(){
  createCanvas(600,600);
  spooky.loop() ;
  tower = createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1; 
doorsGroup=new Group() ;
climbersGroup=new Group();
invisibleBlockGroup = new Group() ;
ghost = createSprite(200,200, 50, 50); 
  ghost.addImage("ghost", ghostImage); 
ghost.scale = 0.5 ;
}

function draw(){
  background('Black'); 
  if(gameState === "play"){
  if(tower.y>400){
    tower.y = 300;
  } 
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3 ;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3
  }
  if(keyDown("space")){
    ghost.velocityY = -8 ;
  }
ghost.velocityY = ghost.velocityY + 0.5 ;
  if(climbersGroup .isTouching(ghost)) {
    ghost.velocityY = 0; 
  }
if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
  ghost.destroy()
  gameState= "end" ; 
}
  spawnDoors();
drawSprites()
}
  if(gameState === "end"){
    fill("red"); 
    textSize(50); 
    text("Game Over !", 200, 250) ;
  }
}
function spawnDoors(){
  //write code here to spawn the doors 
  if (frameCount % 300 === 0){
    var door = createSprite(200,-50);
    var climber = createSprite(200,10); 
    door.addImage(doorImage);
    climber.addImage(climberImage); 
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width ;
    invisibleBlock.height = 2 ; 
    door.x = Math.round(random(120,400))
    climber.x = door.x ; 
    invisibleBlock.x = door.x ;
    invisibleBlock.velocityY = 1;
    door.velocityY = 1;     
    door.lifetime = 600 ;
    
    doorsGroup.add(door);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber); 
    invisibleBlock.debug = true ; 
    invisibleBlockGroup.add(invisibleBlock); 
    
  }
}