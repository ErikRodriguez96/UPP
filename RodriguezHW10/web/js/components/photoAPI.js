function photoAPI (){
        
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    
    var myDiv1 = document.createElement("div");
    document.getElementById("content").appendChild(myDiv1);
    //var headContent = "<h2>Users/Photographers</h2>";
    //myDiv1.appendChild(headContent);
    var img = Utils.make({
        htmlTag: "img",
        parent: heading
    });
    img.src = CRUD_icons.insert;
    img.onclick=function(){
        window.location.hash ="#/userInsert";
    };
    
    myDiv1.appendChild(img);

    // Make AJAX call to read users.json and if the call was successful, run function
    // processUserData, otherwise, put an error message in the mydiv1 DOM element. 
    ajax("webAPIs/listOtherAPI.jsp", processPhotoData, myDiv1);

    function processPhotoData (initList) { // callback function
        if (initList.dbError.length !== 0) {
            document.getElementById("listHere").innerHTML = initList.dbError;
            console.log("PROCESS ERROR");
        } else {
            var userList = initList.photo;
            console.log("USERLIST REACHED");
        }
        // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(userList); 

        // Create new object list where all properties are <td> elements
        var newUserList = [];
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].Location = SortableTableUtils.makeText(userList[i].location);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].imageUrl, "20rem");
            newUserList[i].Date = SortableTableUtils.makeDate(userList[i].dateTaken);
        }

        // MakeTableBetter expects all properties to be <td> elements.
        paramObj = {title: "Photos", objList: newUserList, sortOrderPropName: "Location", sortIcon: "icons/sortUpDown16.png"};
        var myReport1 = MakeFullTable(paramObj);
        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } // processUserData 
    return myDiv1;
}
