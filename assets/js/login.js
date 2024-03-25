//document.getElementById("popUpTarget").style.display = "none";


function logInPopUpFun() {
    var x = document.getElementById("popUpTarget");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function singInUser(){
    var email = document.getElementById("emailUser").value;
    var password = document.getElementById("passwordUser").value;

    //checking if the user have added a password or email
    if(email.length < 1){
        alert("You need to add an email!");
        return;
    }
    if(password.length < 1){
        alert("You need to add a password!");
        return;
    }

    // get all the local storage users
    var usersJSON = localStorage.getItem("users");
    var users = JSON.parse(usersJSON) || [];
    
    
    var founduser = "";
    // find the user that has the same email
    // then see if the password is correct
    for (var i = 0; i < users.length; i++) {        
        // Check if the user's email matches the provided email 
        if (users[i].email == email) {
            founduser = users[i]; // Return the user object if found
        }
    }
    //Checking if we have the user registered in our system
    if(founduser == ""){
        alert("No user found!");
        return;
    }

    //checking the users password
    if(password === founduser.password){
        //password is correct, then you create a new local storage, and add this user and inforation to a 
        //variable named currentUser
        localStorage.setItem('loggedinnuser', JSON.stringify(founduser));
        logInPopUpFun();
        
        document.getElementById("logintarget").style.display = "none";
        document.getElementById("userContentTarget").innerHTML = 'Welcome, ' + founduser.fullname + '!';

        alert("You are being logged in!");
    }
    else {
        alert("incorrect password!!!");
        return;
    }
    // will make the log in butn go away after logging in 
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("logoutSection").style.display = "block";

    console.log("User logged in:", loggedInUser);
}
document.addEventListener("DOMContentLoaded", function() {
    //Check if there is a user that is logged in
    var loggedInUser = JSON.parse(localStorage.getItem("loggedinnuser"));
    
    if (loggedInUser) {
        //if the user is logged in, remove the log in and register user
        document.getElementById("logintarget").style.display = "none";
        document.getElementById("userContentTarget").innerHTML = 'Welcome, ' + loggedInUser.fullname + '!';
    } 
});

function logoutButn(){
    var logoutSection = document.getElementById("logoutSection");
    var logoutButton = document.getElementById("logoutButton");
    if (loggedInUser) {
    loginSection.style.display = "none";
    logoutSection.style.display = "block";
    }

 // Remove the logged-in user from local storage
    logoutButton.addEventListener("click", function() {
    localStorage.removeItem("loggedinnuser");

        // Hide the logout button and show the login form
    loginSection.style.display = "block";
    logoutSection.style.display = "none";

    console.log("User logged out.");
    })
}


logintarget