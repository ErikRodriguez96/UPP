function twoPics() {
    //Initializing the 2 object DOM
    var twoPicsDOM = document.createElement("div");

    //First object is initialized with hard-coded values
    var erikParam = {photographer: "Erik", location: "Shibuya Crossing, Shibuya, Tokyo", 
        path: "pics/shibuya.jpeg", favorite: "The Nintendo Store", money: 10};

    picObjErik = makePic(erikParam);            //Pass the initial object to the Make script
    picObjErik.classList.add("picStyling");     //Adds object-specific styling to the object
    twoPicsDOM.appendChild(picObjErik);         //Adds the object to the DOM
    
    //Initializes the Make script's mutator buttons and inputs
    //Specifically for the 'owner/photographer' and 'loc/location' values
    var erikPicBtnOwn = document.createElement("button");
    erikPicBtnOwn.innerHTML = "Change Photographer";
    twoPicsDOM.appendChild(erikPicBtnOwn);
    var erikPicInputOwn = document.createElement("input");
    twoPicsDOM.appendChild(erikPicInputOwn);
    
    var erikPicBtnLoc = document.createElement("button");
    erikPicBtnLoc.innerHTML = "Change Location";
    twoPicsDOM.appendChild(erikPicBtnLoc);
    var erikPicInputLoc = document.createElement("input");
    twoPicsDOM.appendChild(erikPicInputLoc);

    // Enables click functionality on buttons
    erikPicBtnOwn.onclick = function () {
        picObjErik.setOwner(erikPicInputOwn.value);
    }; 
    erikPicBtnLoc.onclick = function () {
        picObjErik.setLoc(erikPicInputLoc.value);
    };
    
    //Same exact functionality as above object, 
    //TODO Figure out how to intialize these 2 objects using one scripting block
    //instead of copy pasting
    var rachelParam = {photographer: "Rachel", location: "Shinjuku Gyoen Park, Shinjuku, Tokyo", 
        path: "pics/shinjuku gyoen.jpeg", favorite: "The Temple", money: 50};
    
    picObjRachel = makePic(rachelParam);
    picObjRachel.classList.add("picStyling");
    twoPicsDOM.appendChild(picObjRachel);

    var rachelPicBtnOwn = document.createElement("button");
    rachelPicBtnOwn.innerHTML = "Change Owner";
    twoPicsDOM.appendChild(rachelPicBtnOwn);
    var rachelPicInputOwn = document.createElement("input");
    twoPicsDOM.appendChild(rachelPicInputOwn);
    
    var rachelPicBtnLoc = document.createElement("button");
    rachelPicBtnLoc.innerHTML = "Change Location";
    twoPicsDOM.appendChild(rachelPicBtnLoc);
    var rachelPicInputLoc = document.createElement("input");
    twoPicsDOM.appendChild(rachelPicInputLoc);

    rachelPicBtnOwn.onclick = function () {
        picObjRachel.setOwner(rachelPicInputOwn.value);
    };
    rachelPicBtnLoc.onclick = function () {
        picObjRachel.setLoc(rachelPicInputLoc.value);
    };

    return twoPicsDOM;
}


