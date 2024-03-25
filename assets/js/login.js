document.getElementById("popupOutline").style.display = "none";

function logInPopUpFun() {
    console.log("triggered fun popup button"); 
    var x = document.getElementById("popupOutline");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}