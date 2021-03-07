var apikey = "6af5e413e17f42d047fcc0b61f2c0618";
var value=Number(sessionStorage.getItem("movie"));
var span=document.getElementsByTagName("span");
var time=["9.00 AM","12.00 PM","3.00 PM","6.00 PM"];
var screen=[1,2,3]

fetch(`https://api.themoviedb.org/3/movie/${value}?api_key=${apikey}`)
.then(response=>response.json())
.then(response=>getDetails(response.original_title))

function getDetails(value){
       span[1].innerHTML+=value;
}

span[2].innerHTML+=sessionStorage.getItem("date");
span[3].innerHTML+=time[Number(sessionStorage.getItem("time"))];
span[4].innerHTML+=screen[Number(sessionStorage.getItem("screen"))]
span[5].innerHTML+=sessionStorage.getItem("seats");

document.getElementById("logout").onclick=()=>{
    window.open("http://127.0.0.1:5500/index.html"); 
}