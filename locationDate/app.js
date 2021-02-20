//Display only 3 days in date section
var $date=document.getElementById("dates");
var x=new Date();
var mon=Number(x.getMonth())+1;
var dte=Number(x.getDate())+2;
if(mon<10){
    mon="0"+mon
}

var a=x.getFullYear()+"-"+mon+"-"+x.getDate();
var b=x.getFullYear()+"-"+mon+"-"+dte;
$date.setAttribute("min",a)
$date.setAttribute("max",b);

var $main=document.getElementById("main");//Full body
var $theaters=document.getElementsByClassName("theater");//Getting theater based on particular location
var $button=document.getElementById("submit");
var $val0=document.getElementById("loc");
var $val1=document.getElementById("Chennai")
var $val2=document.getElementById("Madurai")
var $val3=document.getElementById("Banglore");
var $val="";//Contain the Location name
var $vale="";//Contain the Branch based on Location

function change(){
    $val=$val0.value;
    console.log($val)
    if($val=="Chennai"){
        $theaters[1].style.display="none";
        $theaters[2].style.display="none";
        $theaters[0].style.display="flex";
    }
    if($val=="Madurai"){
        $theaters[0].style.display="none";
        $theaters[2].style.display="none";
        $theaters[1].style.display="flex";
    }
    if($val=="Banglore"){
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
    return true;
       
    
}
