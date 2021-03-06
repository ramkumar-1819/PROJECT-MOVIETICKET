//no of seats in theater
var $no_seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

//if movie is selected (ie) booked by the first person means seats the movie seats in the storages
if(localStorage.getItem(sessionStorage.getItem("date")+sessionStorage.getItem("mall")+sessionStorage.getItem("movie")+sessionStorage.getItem("screen")+sessionStorage.getItem("time"))==null){
    localStorage.setItem(sessionStorage.getItem("date")+sessionStorage.getItem("mall")+sessionStorage.getItem("movie")+sessionStorage.getItem("screen")+sessionStorage.getItem("time"),$no_seats)
}

//get the available seats
var $items=localStorage.getItem(sessionStorage.getItem("date")+sessionStorage.getItem("mall")+sessionStorage.getItem("movie")+sessionStorage.getItem("screen")+sessionStorage.getItem("time"));
var $seats=$items.split(",");
var n=0;
if($seats==""){//if no seat available display a popup show no seats available
    document.getElementById("popup").style.visibility="visible";
    document.getElementsByTagName("button")[1].onclick=()=>{
        document.getElementById("popup").style.visibility="hidden";
    }
}



var $seatings=document.querySelectorAll(".seating");
$seatings.forEach(values=>{
    var $x=values.getAttribute("id"); 
    if($seats.indexOf($x)>=0){
        values.addEventListener("click",function(){//give clickable option only to available seats
        myfun(this)
    })
    }
})


main();
function main(){
    $seats=$seats.map(value=>Number(value))
    $no_seats.forEach(val=>{
          if($seats.indexOf(val)<0){
              document.getElementsByClassName("seating")[val-1].style.backgroundColor="red";//change the background color of selected seats as red when proceed to next section
          }
    })
}



var arr=[];
function myfun(value){
    if(value.style.backgroundColor=="green"){//First time clickable the seat color change to green
        value.style.backgroundColor="white";//second time click the selected seat means seat color change to default white
        var x=value.getAttribute("id");
        var $index=arr.indexOf(Number(x));
        arr.splice($index,1);//delete the  seat number in arr when deselect the seats
        display_total();
    }
    else{
    value.style.backgroundColor="green";
    n=1;
    var x=value.getAttribute("id");
    arr.push(Number(x));//push the seat number into array
    console.log(arr);
    display_total();
    }
    
}



function display_total(){
    document.getElementById("result").innerHTML=arr.length;//show number of seats that you selected
}
var $values=localStorage.getItem(sessionStorage.getItem("date")+sessionStorage.getItem("mall")+sessionStorage.getItem("movie")+sessionStorage.getItem("screen")+sessionStorage.getItem("time"));
var $arr=$values.split(",");
$arr=$arr.map(value=>Number(value))//hold available seats that got from storages


//when confirm button is clicked then goes to next page and those selected seats are blocked
document.getElementById("confirm").addEventListener("click",function(){
console.log(n)
  if(n==1){
  document.getElementsByTagName("a")[0].href="http://127.0.0.1:5500/PROJECT-MOVIETICKET-/ticketPrinting/index.html";
  }
  n=0;
  var $selected_seats=[];//contain the selected seats list and we store it in session storages
  arr.forEach(value=>{
     var x=$arr.indexOf(value);
     $selected_seats.push($arr.splice(x,1));
     console.log($selected_seats)
     sessionStorage.setItem("seats",String($selected_seats));
     arr=[];
     localStorage.setItem(sessionStorage.getItem("date")+sessionStorage.getItem("mall")+sessionStorage.getItem("movie")+sessionStorage.getItem("screen")+sessionStorage.getItem("time"),$arr)
  })
})

