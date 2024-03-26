function logInPopUpFun() {
    var x = document.getElementById("popUpTarget");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function singInUser() {
    var email = document.getElementById("emailUser").value;
    var password = document.getElementById("passwordUser").value;

    // Checking if the user has added a password or email
    if (email.length < 1) {
        alert("You need to add an email!");
        return;
    }
    if (password.length < 1) {
        alert("You need to add a password!");
        return;
    }

    // Get all the local storage users
    var usersJSON = localStorage.getItem("users");
    var users = JSON.parse(usersJSON) || [];

    var foundUser = null;
    // Find the user that has the same email
    // Then see if the password is correct
    for (var i = 0; i < users.length; i++) {
        // Check if the user's email matches the provided email
        if (users[i].email === email) {
            foundUser = users[i]; // Return the user object if found
            break;
        }
    }

    // Checking if we have the user registered in our system
    if (!foundUser) {
        alert("No user found!");
        return;
    }

    // Checking the user's password
    if (password === foundUser.password) {
        // Password is correct, then you create a new local storage, and add this user and information to a variable named currentUser
        localStorage.setItem('loggedinnuser', JSON.stringify(foundUser));
        logInPopUpFun();

        document.getElementById("logintarget").style.display = "none";
        document.getElementById("userContentTarget").innerHTML = 'Welcome, ' + foundUser.fullname + '!';

        alert("You are being logged in!");
    } else {
        alert("Incorrect password!");
        return;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if there is a user that is logged in
    var loggedInUser = JSON.parse(localStorage.getItem("loggedinnuser"));

    if (loggedInUser) {
        // If the user is logged in, remove the log in and register user
        document.getElementById("logintarget").style.display = "none"; 
        document.getElementById("logoutSection").style.display = "block";
        document.getElementById("userContentTarget").innerHTML = 'Welcome, ' + loggedInUser.fullname + '!';
    } else {
        // Update UI if user is not logged in
        document.getElementById("logintarget").style.display = "block";
        document.getElementById("logoutSection").style.display = "none";
        document.getElementById("userContentTarget").innerHTML = '';
    }

    // Attach event listener for logout button
    var logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Remove the logged-in user from local storage
            localStorage.removeItem("loggedinnuser");

            // Show the login form and hide the logout button
            document.getElementById("logintarget").style.display = "block";
            document.getElementById("logoutSection").style.display = "none";
            document.getElementById("userContentTarget").innerHTML = '';
        });
    }
    
});