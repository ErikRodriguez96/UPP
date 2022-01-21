
var account = {};

account.logOn = function (){

    var container = document.createElement("div");
    container.classList.add("find");

    var emailInput = document.createElement("input");
    emailInput.setAttribute("type", "text");
    container.appendChild(emailInput);

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    container.appendChild(passwordInput);

    var logOnButton = document.createElement("button");
    logOnButton.innerHTML = "Submit";
    container.appendChild(logOnButton);

    var msgDiv = document.createElement("div");
    container.appendChild(msgDiv);

    logOnButton.onclick = function(){

        var logOnUserObj = {
            "userEmail": emailInput.value,
            "userPassword": passwordInput.value,
            "errorMsg": ""       
        };
        console.log(logOnUserObj);

        if (emailInput.value === "") {
            logOnUserObj.errorMsg = "Please Provide an E-Mail address";
            var msg = buildProfile(logOnUserObj);
            msgDiv.innerHTML = msg;
        }

        else if (passwordInput.value === "") {
            logOnUserObj.errorMsg = "Please Provide a password";
            var msg = buildProfile(logOnUserObj);
            msgDiv.innerHTML = msg;
        }

        else {
            var url = "webAPIs/logOnAPI.jsp?userEmailInput=" + encodeURI(emailInput.value) 
                    + "&userPwdInput=" + encodeURI(passwordInput.value);
            ajax(url, processLogon, document.getElementById("recordError"));

            function processLogon(obj) {
                console.log("Successfully called the find API. Next line shows the returned object.");
                var msg = buildProfile(obj);
                msgDiv.innerHTML = msg;
            }
        }
    };

    return container;
};

account.getProfile = function(){

    var container = document.createElement("div");
    container.classList.add("find");

    var msgDiv = document.createElement("div");
    container.appendChild(msgDiv);

    var url = "webAPIs/getProfileAPI.jsp";
    ajax(url, processLogon, document.getElementById("recordError"));

    function processLogon(obj) {
        console.log("Successfully called the find API. Next line shows the returned object.");
        console.log(obj);
        var msg = buildProfile(obj);
        msgDiv.innerHTML = msg;
    }

    return container;
};

account.logOff = function(){

    var container = document.createElement("div");
    container.classList.add("find");

    var msgDiv = document.createElement("div");
    container.appendChild(msgDiv);

    var url = "webAPIs/logOffAPI.jsp";
    ajax(url, processLogon, document.getElementById("recordError"));

    function processLogon(obj) {
        console.log("Successfully called the find API. Next line shows the returned object.");
        console.log(obj);
        var msg = buildProfile(obj);
        msgDiv.innerHTML = msg;
    }

    return container;
};

function buildProfile (userObj) {

    var msg = "";
    if (userObj.errorMsg.length > 0) {
    msg += "<strong>" + userObj.errorMsg + "</strong>";
    } else {
    msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
    msg += "<br/> Birthday: " + userObj.birthday;
    msg += "<br/> MembershipFee: " + userObj.membershipFee;
    msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
    msg += "<img> <img src ='" + userObj.image + "'> </img>";
    }
    return msg;
}
