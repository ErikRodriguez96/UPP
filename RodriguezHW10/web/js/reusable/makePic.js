function makePic(picParams) {

    //Initializing objects and variables using the passed parameter object
    var picObj = document.createElement("div");
    var picInfo = document.createElement("div");
    picObj.appendChild(picInfo);
    var picImg = document.createElement("img");
    
    //Checks if there's no object, if so initializes the parameter object
    //as an empty object which will then be filled with default values
    if (!picParams) {
        picParams = {};
    }
    
    //Default values in place in case the object is missing them 
    picImg.src = picParams.path || "pics/tokyo.jpg";
    picObj.appendChild(picImg);
    picObj.owner = picParams.photographer || "Getty";
    picObj.loc = picParams.location || "Tokyo, Japan";
    picObj.fav = picParams.favorite || "Japan";
    picObj.money = picParams.money || 10;
    //This varible is just used to display the original dollar amount
    //during mouse over, it is not modified after initialization
    var displayMoney = picObj.money;
    
    //Private method “display”, makes the object's values visible on the page
    function display( ) {           
        picInfo.innerHTML = "Photographer Name: " + picObj.owner + 
                "<br/> Photo Location: " + picObj.loc + 
                "<br/> Guess how much $" + picObj.money + " is in Yen!" + 
                "<br/> My favorite spot here was: ";
    };
    
    //Borrows a lot of code from display function, displays the object's
    //"hidden" values and does the currency conversion
    picImg.onmouseenter = function () {
        console.log("onmouseover");
        convertToYen();
        picInfo.innerHTML = "Photographer Name: " + picObj.owner + 
                "<br/> Photo Location: " + picObj.loc +
                "<br/> $" + displayMoney + " = ¥" + picObj.money +
                "<br/> My favorite spot here was: " + picObj.fav + "!";
    };
    
    //Reverses the onmouseover function's work by converting back to USD
    //and calling the normal display method
    picImg.onmouseout = function () {
        console.log("onmouseout");
        convertToUSD();
        display();
    };

    //The conversion functions mutate  the object's 'money' value by multiplying
    //the value by a simple hard-coded exchange rate
    function convertToYen(){
        picObj.money = picObj.money * 105;
    }
    
    function convertToUSD(){
        picObj.money = Math.round(picObj.money * 0.0095);
    }

    //Mutators for the location and owner values of the object.
    //They call the display() method after changing the values to update
    //the displayed page
    picObj.setLoc = function (newLoc) {
        picObj.loc = newLoc;
        display();
    };
    
    picObj.setOwner = function (newOwn) {
        picObj.owner = newOwn;
        display();
    };

    //Debugging console log, commented out for deployment
    /*picObj.log = function () {
        console.log("Name of Photographer with ID " + picObj.id + " is " + picObj.name + 
                    " and Location is " + picObj.loc);
    };*/

    display(); //Shows the object's initial values on the page, should only be called once
    return picObj;
}