var dog, happyDog, dogImage, happyDogImage;
var database;
var food, foodStack;

function preload()
{
  dogImage = loadImage("images/Dog");
  happyDogImage = loadImage("images/happyDog");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(200,200,40,50);
  dog.addImage(dogImage);
 
  database = firebase.database;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  
  textSize(20);
  fill("turquoise");
  stroke(0);
  text(foodStock, 100,100);

  textSize(10);
  fill(0);
  stroke(0);
  text("Press UP_ARROW to feed milk", 50,50);

}

function readStock(data){
  food = data.val();
}

function writeStock(x){

  if(x <= 0){
    x=0;
  } else {
    x = x -1;
  }

  database.ref('/').update({
    Food:x
  })
}




