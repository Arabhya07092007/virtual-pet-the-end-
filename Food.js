    class Food{
        constructor(){

            this.image = loadImage("Milk.png");
        }

        display(){

            
            if(foodS!= undefined){

                var x = 120,y = 170;
                imageMode(CENTER);
                //image(milk,720,220,70,70);
        
                if(foodS!=0){
                for( var i = 0; i < foodS;i++){
                if(i%10==0){
                x = 80;
                y+=80;
        
                }
        
                image(milk,x,y,80,80);
                x+=35
            }
            }
            }

            

        }

        getFoodStocke(){

        foodStocke = database.ref('food');
        foodStocke.on("value",function (data){
            foodS = data.val();
            });

        }

        updateFoodStocke(){

        if(foodS!= undefined){
        database.ref('/').update({
        food:foodS
        })
        }
        }

        deduct(){

           // if(foodS!= undefined){
                foodS = foodS-1;

           // }
        }

        bedroom(){
           
            background(bedroomImg,550,500);
            
        }

        garden(){
            background(gardenImg,550,500)
        }

        washroom(){
            background(washroomImg,550,500);
        }


    }