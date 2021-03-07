var $date=document.getElementById("dates");             //Display only 3 days in date section [its our wish I used booking for the upcoming 3 days only]

const x=new Date();
var initialDate=Number(x.getDate());                   
var month=Number(x.getMonth())+1;
var finalDate=Number(x.getDate())+2;
if(month<10){
    month="0"+month
}
if(initialDate<10){
  initialDate="0"+initialDate;
}
if(finalDate<10){
    finalDate="0"+finalDate;
}
var a=x.getFullYear()+"-"+month+"-"+initialDate;
var b=x.getFullYear()+"-"+month+"-"+finalDate;
$date.setAttribute("min",a)                                        //today
$date.setAttribute("max",b);                                       //3rd day from today

var $main=document.getElementById("main");                         //Full body
var $theaters=document.getElementsByClassName("theater");          //Getting theater based on particular location
var $button=document.getElementById("submit");
var $val0=document.getElementById("loc");
var $val1=document.getElementById("Chennai")
var $val2=document.getElementById("Madurai")
var $val3=document.getElementById("Banglore");
var $location="";                                                  //Contain the Location name
var $branch="";                                                    //Contain the Branch based on Location

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
    $branch=$val1.value;
}
function change2(){
    $branch=$val2.value;
}
function change3(){
    $branch=$val3.value;
}

function submitting(){                                             //Check if all fields are completely filled or not
    if($branch==""){
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
    sessionStorage.setItem("date",$date.value)                      //set the date in session storage
    sessionStorage.setItem("mall",$branch); 
    sessionStorage.setItem("location",$location);                        //set the branch in session storage
    sessionStorage.setItem("initialDate",a);
    sessionStorage.setItem("finalDate",b)
    //make everything as empty once the session storage is set,reason bcz once you come back to this page everything start from beginning
    $date.value="";
    $val0.value="";
    $val1.value="";
    $val2.value="";
    $val3.value="";
    $theaters[0].style.display="none";
    $theaters[1].style.display="none";
    $theaters[2].style.display="none";
    window.open("http://127.0.0.1:5500/movieList/index.html","_self") //When Every field is filled then next page opens
    return false;   
}
