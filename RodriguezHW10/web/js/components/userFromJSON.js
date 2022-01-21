
function userFromJSON () {
    
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    
    var myDiv1 = document.createElement("div");
    document.getElementById("content").appendChild(myDiv1);
    //var headContent = "<h2>Users/Photographers</h2>";
    //myDiv1.appendChild(headContent);

    // Make AJAX call to read users.json and if the call was successful, run function
    // processUserData, otherwise, put an error message in the mydiv1 DOM element. 
    ajax("json/users.json", processUserData, myDiv1);

    function processUserData (userList) { // callback function

        // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(userList); 

        // Create new object list where all properties are <td> elements
        var newUserList = [];
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].User_Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "4rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(userList[i].birthday);
        }

        // MakeTableBetter expects all properties to be <td> elements.
        paramObj = {title: "Photographers", objList: newUserList, sortOrderPropName: "User_Email", sortIcon: "icons/sortUpDown16.png"};
        var myReport1 = MakeFullTable(paramObj);
        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } // processUserData 
    return myDiv1;
    
}



