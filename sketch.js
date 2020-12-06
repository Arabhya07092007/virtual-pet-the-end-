  var dog,happyDog,dog2,database,foodS,foodStocke;
  var milk;

  var b1, b2;
  var foodObj;

  var fedTime, lastFed;
  var hour;

  var gmState, readgm;
  var bedroomImg, gardenImg, washroomImg, lazydog;


  function preload(){

    happyDog = loadImage("dogImg1.png");
    dog2 = loadImage("dogImg.png");
    milk = loadImage("Milk.png");

    bedroomImg = loadImage("img/Bed Room.png");
    gardenImg = loadImage("img/Garden.png");
    washroomImg = loadImage("img/Wash Room.png");

    lazydog = loadImage("img/Lazy.png");

  }

  function setup() {
    createCanvas(1000,500);

    database = firebase.database();

    gmstate = ''

    foodObj = new Food();
    dog = createSprite(800,340,10,10);
    dog.addImage(dog2);
    dog.scale = 0.2;

    b1 = createButton("Feed the dog ");
    b1.position(500,270);   

    b2 = createButton("Add stocke");
    b2.position(630,270);

  }

  function draw() { 
  background(46, 139, 87);

  //// calling the get time and background functions 

  drawSprites();
  getTime();
  backGround();

  foodObj.getFoodStocke();
  foodObj.display();

  // reading the fed time 

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function (data){
   lastFed = data.val();
  });


  /// updating the last fed 

  if(lastFed==hour&&hour!= undefined){
  database.ref("/").update({
     FeedTime:lastFed
  })
  }

  // Reading the gameState
  readgm = database.ref("gameState");
  readgm.on("value",(data) => {
       gmState= data.val();
    })
  
  if(gmState!="hungry"){

    b1.hide();
    b2.hide();
    dog.remove();

  }else{

    b1.show();
    b2.show();
    dog.addImage(lazydog);

  }

  console.log(hour+"  "+lastFed);
    
  /////// Asigning the button functionality
  if(foodS != undefined){

  b1.mousePressed(()=>{
  foodS--;
  foodObj.updateFoodStocke();

  if(hour!=undefined){
  lastFed = hour;}
  feedDog();

  });

  b2.mousePressed(()=>{
    foodS++;
    foodObj.updateFoodStocke();
  });
  }

  //////////////
 
  // some conditionals 

  if(foodS>=20){
    foodS = 20;
    foodObj.updateFoodStocke();
  }

  if(foodS!=undefined&&foodS<=0){
    foodS = 0;
  }

  ////////////


  // Asigning the texts 
      
  textSize(20);
  fill(0, 51, 102);
  text(" Food remaining : "+foodS,700,170);
  text("My Doggy game ",450,50);
    
  fill(0, 51, 102);
  textSize(20);


  if(hour!= undefined){
  if(lastFed>=12){
    text("last feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("last Feed : "+lastFed+ "AM",350,30);
  }

  }

  //////////////////////

  } 

  function feedDog(){

    dog.addImage(happyDog);
    if(dog.x > 500){
    dog.x = dog.x-7;
    
  }}

  function addFood(){

      foodS++;
      if(frameCount%80==0){
        console.log('error nahi ayya !...........')}
  }

    async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    //  console.log(responseJSON);

    var datetime = responseJSON.datetime;
    hour = datetime.slice(11,13);
    //console.log(hour);
  
  }

  function gm_update(data){

    database.ref('/').update({
    gameState:data
    })
  }



  function backGround(){

  ///// all conditionals for backgrounds

  if(hour==(lastFed+1)){

    foodObj.garden();
    gm_update("play");

  }else if(hour==(lastFed+2)){

    foodObj.bedroom();
    gm_update("sleeping");

  }else if(hour>(lastFed+2)&& hour<=(lastFed+4)){
    
    gm_update("bathing");
    foodObj.washroom();

  }else{

    gm_update("hungry");
    foodObj.display();

  }

   ///////////////////////////////

  }


