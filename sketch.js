//Create variables here
var saddog, happydog
var dog,foodS,foodstock,database
var feed,addfood,food,fedtime,lastfed
function preload()
{ saddog=loadImage("images/dogImg.png")
 happydog=loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database()
  dog=createSprite(800,200,150,150)
  dog.addImage(saddog)
  dog.scale=0.5
  food=new Food()
  foodstock=database.ref('food')
  foodstock.on("value",readstock)
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feeddog)
  addfood=createButton("addfood")
  addfood.position(800,95)
  addfood.mousePressed(addfoods)
}


function draw() {  
background("blue")
fedtime=database.ref('fedtime')
fedtime.on("value",function(data){
  lastfed=data.val()
})
  drawSprites();
  //add styles here
textSize(15)
if(lastfed>=12){
  text("lastfed"+lastfed%12+"PM",350,30)
}
else if(lastfed==0){
  text("lastfed 12AM",350,30)
}
else{
  text("lastfed"+lastfed+"AM",350,30)
}
}

function readstock(data){
foodS=data.val()


}
function writestock(x){
  if(x<=0){
    x=0
  }
else{
  x=x-1
}
database.ref('/').update({
food:x})
}

function feeddog(){
  dog.addImage(happydog)
  food.updatefoodstock(food.getfoodstock()-1)
database.ref('/').update({
  food:food.getfoodstock(),
fedtime:hour()
  
})
}
function addfoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}
