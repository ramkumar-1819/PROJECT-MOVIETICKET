//Display only 3 days in date section [its our wish I used booking for 3 days]
var $date=document.getElementById("dates");

const x=new Date();
var datee="";
var mon=Number(x.getMonth())+1;
var dte=Number(x.getDate())+2;
if(mon<10){
    mon="0"+mon
}
if(Number(x.getDate()<10)){
  datee="0"+x.getDate();
  dte="0"+dte;
}
var a=x.getFullYear()+"-"+mon+"-"+datee;
var b=x.getFullYear()+"-"+mon+"-"+dte;
console.log(a)
console.log(b)
$date.setAttribute("min",a)//today
$date.setAttribute("max",b);//3rd day from today

var $main=document.getElementById("main");//Full body
var $theaters=document.getElementsByClassName("theater");//Getting theater based on particular location
var $button=document.getElementById("submit");
var $val0=document.getElementById("loc");
var $val1=document.getElementById("Chennai")
var $val2=document.getElementById("Madurai")
var $val3=document.getElementById("Banglore");
var $location="";//Contain the Location name
var $vale="";//Contain the Branch based on Location

function change(){
    $location=$val0.value;
    if($location=="Chennai"){
        $theaters[1].style.display="none";
        $theaters[2].style.display="none";
        $theaters[0].style.display="flex";
    }
    if($location=="Madurai"){
        $theaters[0].style.display="none";
        $theaters[2].style.display="none";
        $theaters[1].style.display="flex";
    }
    if($location=="Banglore"){
        $theaters[0].style.display="none";
        $theaters[1].style.display="none";
        $theaters[2].style.display="flex";
    }
    
}

function change1(){
    $vale=$val1.value;
    console.log($vale)
}
function change2(){
    $vale=$val2.value;
    console.log($vale)
}
function change3(){
    $vale=$val3.value;
    console.log($vale)
}
function submitting(){ //Check if all fields are completely filled or not
    console.log($vale)
    if($vale==""){
        alert("PLZ FILL OUT THE GIVEN FIELDS")
        return false;
    }
    if($date.value==""){
        alert("PLZ FILL OUT THE GIVEN FIELDS")
        return false;
    }
    
    if($val1==""){
        alert("PLZ FILL OUT THE GIVEN FIELDS")
        return false;
    }
    
    sessionStorage.setItem("date",$date.value)//set the date in session storage
    sessionStorage.setItem("mall",$vale);//set the branch in session storage
    //make everything as empty once is session storage is set,reason bcz once you come back to this everything start from beginning
    $date.value="";
    $val0.value="";
    $val1.value="";
    $val2.value="";
    $val3.value="";
    $theaters[0].style.display="none";
    $theaters[1].style.display="none";
    $theaters[2].style.display="none";
    window.open("http://127.0.0.1:5500/movieList/index.html","_self")
    return false;   
    
}
