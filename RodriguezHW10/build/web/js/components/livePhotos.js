function livePhotos() {

    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listPhotoAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listOtherAPI.jsp AJAX successfully returned the following data");
        console.log(obj);

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Photo List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = CRUD_icons.insert;
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/photoInsert";
        };


        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        // create photoList (new array of objects) to have only the desired properties of obj.photo. 
        // Add the properties in the order you want them to appear in the HTML table.  
        var photoList = [];
        for (var i = 0; i < obj.photo.length; i++) {
            photoList[i] = {}; // add new empty object to array
            
            //photoList[i].Photo_Id = SortableTableUtils.makeNumber(obj.photo[i].photoId, false);
            photoList[i].Title = SortableTableUtils.makeText(obj.photo[i].title);
            photoList[i].Location = SortableTableUtils.makeText(obj.photo[i].location);
            photoList[i].Date_Taken = SortableTableUtils.makeDate(obj.photo[i].dateTaken);
            photoList[i].Image = SortableTableUtils.makeImage(obj.photo[i].imageUrl, "20rem");
            photoList[i].Blurb = SortableTableUtils.makeText(obj.photo[i].blurb);
            photoList[i].Web_User_Id = SortableTableUtils.makeText(obj.photo[i].webUserId + " - " +
                    obj.photo[i].userEmail);

            photoList[i]._Update = SortableTableUtils.makeLink(
                "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                '#/photoUpdate/' + obj.photo[i].photoId             // href of link
            );
    
            photoList[i]._Delete = SortableTableUtils.makeImage(CRUD_icons.delete, '1rem');
            
            // freeze the photoId
            const photoId = obj.photo[i].photoId;
            photoList[i]._Delete.onclick = function () {
                deletePhoto(photoId,this);
            };

            // Remove this once you are done debugging...
            //photoList[i].Error_Msg = SortableTableUtils.makeText(obj.photo[i].errorMsg);

        }
        var heading = "";
        var paramsObj = {title: heading, objList: photoList, sortOrderPropName: "Location", sortIcon: "icons/sortUpDown16.png"};
        var webUserTable = MakeFullTable(paramsObj);
        //var webUserTable = MakeClickSortTable(heading, photoList, "User_Id", "icons/sortUpDown16.png");

        contentDOM.appendChild(webUserTable);
    } // end of function success
    
    function deletePhoto (photoId, td) {
        console.log("to delete photo "+ photoId);

        if (confirm("Do you really want to delete photo " + photoId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            
            var deleteMsg = document.createElement("div");
            
            ajax("webAPIs/deletePhotoAPI.jsp?deleteId=" + photoId, success, deleteMsg);
            
            function success(obj){
                console.log("deletePhotoAPI.jsp AJAX successfully returned the following data");
                console.log(obj);
                //If there is an error, print the message otherwise we print nothing
                if (deleteMsg.innerHTML > 0){
                    console.log("Delete error message: " + deleteMsg.innerHTML);
                }
                
                var dataRow = td.parentNode;
                var rowIndex = dataRow.rowIndex - 1; // adjust for column header row?
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
                
            }

            // get the row of the cell that was clicked 

            //alert("Note: this version of the sample code does NOT actually invoke the delete Web API " +
            //        "so the row will reappear when you click elsewhere then click on list users again.");
        }
    }

    return contentDOM;
} // liveUsers