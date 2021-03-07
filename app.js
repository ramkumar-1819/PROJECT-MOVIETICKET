
const $container=document.getElementsByClassName("container")[0];  //Getting the container element
const $content=document.getElementById("content");                 //Getting the content element that contain 2 forms
const $form2=document.getElementById("second");                    //Form 2
const $username=document.forms["signin"]["Username"];              //Getting Username in Signin Form
const $password=document.forms["signin"]["password"];              //Getting password in Signin form
const $signin=document.getElementById("sum")                       //getting Sumbit button in Signin form
const $sum1=document.getElementById("sum1");                       //getting Sigin button in form 2
const $signup=document.getElementById("signup")                    //Getting the signup button in form 1
const $textvalues=document.getElementById("textvalues");           //This element display msg when user authentication is wrong
const $wrong=document.getElementsByClassName("wrong");             //When User input  wrong username in signup form this msg popup
const $username1=document.forms["signup"]["Username"];             //Getting username in Signup
const $password1=document.forms["signup"]["password"];             //Getting Password in Signup
const $password11=document.forms["signup"]["re-password"];         //Getting Re enter Password in Signup


function changing(){                                                   
    $textvalues.innerHTML="";
    $wrong[0].innerHTML="";
    $wrong[1].innerHTML="";
    $wrong[2].innerHTML="";
}

const $form1=document.getElementById("first");                      //Form 1

function submitting(){                                              //sign in form
    if(!localStorage.getItem($username.value)){                     //check if Username is found or not
              $textvalues.innerHTML="USERNAME NOT FOUND PLZ SIGN-UP";
              $textvalues.style.color="white";
              $username.focus();
              return false;
    }
    else if($password.value!=localStorage.getItem($username.value)){ //Check if user enter the right Password
        $textvalues.innerHTML=" WRONG PASSWORD "
        $textvalues.style.color="white";
        $password.focus();
        return false;
    }
    window.open("http://127.0.0.1:5500/locationDate/index.html","_self") //next Page is open when all details are correct
    return false;
}

$sum1.onclick=()=>{                                                      //display the Login in form when sigin is clicked in Signup Form
    $form1.style.visibility="visible";
    $form2.style.visibility="hidden";
}

$signup.addEventListener("click",fun1)

function fun1(){                                                         //display the Signup form when Signup button CLicked
   $form1.style.visibility="hidden";
   $form2.style.visibility="visible";
}

function signupiing(){                                                   //Signup Form Validation
   if($username1.value.length<8){
       $wrong[0].innerHTML="Username must have minimum 7 character";
       $wrong[0].style.color="white";
       $username1.focus();
       return false;
   }
   var pass_patt=/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w]).{8,}/
   if(!$password1.value.match(pass_patt)){
       $wrong[1].innerHTML="Password must contain [ Capz , Small , Digit , Special Char ] and minimum length is 8 ]";
       $wrong[1].style.color="white";
       $password1.focus();
       return false;
    }
    if($password11.value!==$password1.value){
        $wrong[2].innerHTML="Password is not matching !!!"
        $wrong[2].style.color="white";
        $password11.focus();
        return false;
    }
    localStorage.setItem($username1.value,$password1.value)
        alert("Account Created Login To Continue");
        $form1.style.visibility="visible";
        $form2.style.visibility="hidden";
        window.open("http://127.0.0.1:5500/index.html","_self")     //When Account Created Login page appear
    return false;       
}

