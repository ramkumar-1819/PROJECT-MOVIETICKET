localStorage.setItem(0,[1,2,3,0]);                  //Setting this in localStorages bcz numbers in array indicate particular movies
localStorage.setItem(2,[0,3,2,1]);                 //Only the same 4 movies run in that particular theater on the particular date but the movies not run in the same order
localStorage.setItem(1,[2,1,0,3]);

const dat=document.getElementById("dates")         //geting the date element
dat.min=sessionStorage.getItem("initialDate");     //setting the today's date in storage
dat.max= sessionStorage.getItem("finalDate");      //setting the maximum allowed day for booking in storage


var apikey = "6af5e413e17f42d047fcc0b61f2c0618";   //api key
var dates=[];                                      //contain movies data got from the api response
var $screen=document.getElementsByClassName("screen");

//got the movies data from movieDB API by using fetch method and using movie id that passed as parameter
async function getMovie(value){
var $fetch=await fetch(`https://api.themoviedb.org/3/movie/${value}?api_key=${apikey}`)//getting movie details by passing movie id in the url of fetch 
var result=await $fetch.json();
return  result;                                     //return the promise response
}

//In this function contain movieid's  array as a parameter and it call another function to store movie details that got from movieDB API but this happen only all Promise got the response
async function getMovieDetails(arr){                
    var prom=[];
    arr.forEach(val=>{
        prom.push(getMovie(val))
    })
    Promise.all(prom).then(response=>{
        console.log(response)
         displayMovie(response)
    })
    .catch(err=>{
        console.log(err)
    })
}
//displaying the movies that we got as response
function displayMovie(val){
     val.forEach(data=>{
         dates.push(data)
     })
    for(var i=0;i<3;i++){                                       //display movie details in the 3 screens
        var x=localStorage.getItem(i);                         //got random 4 numbers and based on the number only movie display in the screen;
        var $getrand=x.split(",");
        $getrand.forEach((value,index)=>{
        var $movie_details=document.createElement("div");      //hold every info about movie like name,image,likes,popularity
        $movie_details.classList.add("movie_dtl")

        var $movie_name=document.createElement("div");         //movie name
        var $movie_image=document.createElement("img");        //movie poster
        var $movie_like_view=document.createElement("div");    //likes and popularity

        $movie_name.innerHTML=dates[Number(value)].original_title; 
        if(dates[value].poster_path==null){
            $movie_image.src="https://i.stack.imgur.com/WeyM8.jpg";
        }
        else{
            $movie_image.src=`https://image.tmdb.org/t/p/w500/${dates[Number(value)].poster_path}`;
        }
        $movie_image.classList.add("movie_img")
        $movie_like_view.innerHTML="♥"+dates[Number(value)].vote_count+" "+"👁"+dates[Number(value)].popularity;
        $movie_details.appendChild($movie_name);
        $movie_details.appendChild($movie_image);
        $movie_details.appendChild($movie_like_view);
    
        $movie_details.addEventListener("click",function(){          //when particular movie is selected
            console.log("screen "+$movie_details.id)
            console.log("index "+index);
            console.log("value "+value);
            console.log(dates[Number(value)].id)
            sessionStorage.setItem("movie",dates[Number(value)].id)  //set the movie id in session storage
            sessionStorage.setItem("screen",$movie_details.id)       //set the screen number in session storage
            sessionStorage.setItem("time",index)                     //set the time too in session storages
            window.open("http://127.0.0.1:5500/trailer/index.html","_self")
        })
        $movie_details.id=`${i}`;                                    //give id to for every movie based on the screen number and using this only screen number is identified
        if((sessionStorage.getItem("Language")==="All")&&sessionStorage.getItem("Type")==="All"){
            $screen[i].appendChild($movie_details);
        }
        else if(sessionStorage.getItem("Language")==="All" && sessionStorage.getItem("Type")!=="All"){
            var flag=false;
            var total=dates[value].genres.length
            console.log(dates[value].genres.length)
            while(total>0){
                console.log((dates[value].genres[total-1].name))
                if(dates[value].genres[total-1].name===sessionStorage.getItem("Type")){
                    $screen[i].appendChild($movie_details);
                    flag=true;
                    break;
                }
                else{
                    total-=1;
                }
            }
            if(flag==false){
            $movie_details.style.visibility="hidden";
            $screen[i].appendChild($movie_details);
            }
        }
        else if(sessionStorage.getItem("Language")===dates[value].original_language&&sessionStorage.getItem("Type")==="All" ){
            $screen[i].appendChild($movie_details)
        }
        else if(sessionStorage.getItem("Language")===dates[value].original_language && sessionStorage.getItem("Type")!=="All"){
            var total=dates[value].genres.length
            while(total){
                if(dates[value].genres[total-1].name===sessionStorage.getItem("Type")){
                    $screen[i].appendChild($movie_details);
                    break;
                }
                else{
                    total-=1;
                }
            }
        }
        else{
            $movie_details.style.visibility="hidden";
            $screen[i].appendChild($movie_details);
        }
    })
    }
}

//filter option 
document.getElementsByClassName("filter")[0].addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].style.display="block";
    document.getElementById("container").style.opacity=0.3;
})

//exit button in filter
document.getElementById("cross").addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].style.display="none";
    document.getElementById("container").style.opacity=1;
})

//get all the things from storages that we used in filter option
const getdate = sessionStorage.getItem("date");
const getmall = sessionStorage.getItem("mall");
const getTheater = document.getElementsByClassName("theater");
const getBranch = document.getElementsByClassName("branch");

popup();//display only the selected location branch

function popup(){
if(sessionStorage.getItem("Language")===null){          //if no language is set in storage then we set language as All in storages
    sessionStorage.setItem("Language","All");
}
if(sessionStorage.getItem("Type")===null){              //if no Type is set in storage then we set Type as All in storages
    sessionStorage.setItem("Type","All")
}
document.getElementById("lang").value=sessionStorage.getItem("Language");
document.getElementById("typ").value=sessionStorage.getItem("Type");

getlocation = sessionStorage.getItem("location");
if(getlocation==="Chennai"){                         //show the particular Branch only based on the location
    getTheater[0].style.display="block";
    getTheater[1].style.display="none";
    getTheater[2].style.display="none";

    getBranch[0].style.display="block";
    getBranch[1].style.display="none";
    getBranch[2].style.display="none";
}
else if(getlocation==="Madurai"){
    getTheater[1].style.display="block";
    getTheater[0].style.display="none";
    getTheater[2].style.display="none";

    getBranch[1].style.display="block";
    getBranch[0].style.display="none";
    getBranch[2].style.display="none";
}
else if(getlocation==="Banglore"){
    getTheater[2].style.display="block";
    getTheater[1].style.display="none";
    getTheater[0].style.display="none";

    getBranch[2].style.display="block";
    getBranch[1].style.display="none";
    getBranch[0].style.display="none";
}
}
document.getElementById("loc").value=getlocation;
document.getElementById(getlocation).value=getmall;
dat.value=getdate;

//when input fields are changing in the filter option
function change(item){
    sessionStorage.setItem("location",item.value);  //location field
    popup();
} 
function change1(item){                              //branch field
    sessionStorage.setItem("mall",item.value);      
}
function change2(item){                                //branch field
    sessionStorage.setItem("mall",item.value)      
}
function change3(item){                                //branch field
    sessionStorage.setItem("mall",item.value)
}
function change4(item){                                //Date field
    sessionStorage.setItem("date",item.value)
}
function change5(item){                                //Language Field
    sessionStorage.setItem("Language",item.value)
}
function change6(item){                                //Type Field
    sessionStorage.setItem("Type",item.value)
}

//submiting the filters
function submitting(){             
    if(sessionStorage.getItem("location")==="Madurai"){
        if(["Abirami Complex","Vishali'De Mall","Melanium"].indexOf(sessionStorage.getItem("mall"))<0){
               alert("Select the Desired Theater");
               return false;
        }
    }
    else if(sessionStorage.getItem("location")==="Chennai"){
        if(["Marina Mall","Spencer Plaza","Phoenix Marketcity"].indexOf(sessionStorage.getItem("mall"))<0){
               alert("Select the Desired Theater");
               return false;
        }
    }
    else if(sessionStorage.getItem("location")==="Banglore"){
        if(["Lulu Mall","Mantri Square","Garuda Mall"].indexOf(sessionStorage.getItem("mall"))<0){
              alert("Select the Desired Theater");
              return false;
        }
    }
    document.getElementsByClassName("popup")[0].style.display="none";
    document.getElementById("container").style.opacity=1;
    movieID(); //contain particular movie id's for each date and theaters
    return true;
}


movieID();//contain particular movie id's for each date and theaters

function movieID(){

var x=new Date();
var month=Number(x.getMonth())+1;
var dateToday=Number(x.getDate());
if(month<10){
    month="0"+month
}
if(dateToday<10){
    preceed=["0","0","0"]
    if(String(dateToday+1).length>1){
          preceed=["0","",""]
    }
    else if(String(dateToday+2).length>1){
        preceed=["0","0",""]
    }
}
else{
    preceed=["","",""];
}

//Display movie based on particular theater and particular date
if((sessionStorage.getItem("mall")=="Marina Mall")&&x.getFullYear()+"-"+month+"-"+preceed[0]+dateToday===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,794113,587807])
}
if((sessionStorage.getItem("mall")=="Marina Mall")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
   getMovieDetails([795158,587807,722913,676159])
}
if((sessionStorage.getItem("mall")=="Marina Mall")&&x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([764179,587807,795158,786400])
}

if((sessionStorage.getItem("mall")=="Spencer Plaza")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([764179,587807,795158,786400])
}
if((sessionStorage.getItem("mall")=="Spencer Plaza")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([795158,587807,722913,676159])
}
if((sessionStorage.getItem("mall")=="Spencer Plaza")&&x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,587807,626392])
}

if((sessionStorage.getItem("mall")=="Phoenix Marketcity")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([722913,786341,656113,764179])
}
if((sessionStorage.getItem("mall")=="Phoenix Marketcity")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,794113,587807])
}
if((sessionStorage.getItem("mall")=="Phoenix Marketcity")&&x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,458576,643807])
}

if((sessionStorage.getItem("mall")=="Abirami Complex")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,587807,626392])
}
if((sessionStorage.getItem("mall")=="Abirami Complex")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([722913,786341,656113,764179])
}
if((sessionStorage.getItem("mall")=="Abirami Complex")&&x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([739028,626392,676159,587807])
}
if((sessionStorage.getItem("mall")=="Vishali'De Mall")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([722913,786341,656113,764179])
}
if((sessionStorage.getItem("mall")=="Vishali'De Mall")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,532865,739028])
}
if((sessionStorage.getItem("mall")=="Vishali'De Mall")&&x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,587807,626392])
}
if((sessionStorage.getItem("mall")=="Melanium")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,794113,587807])
}
if((sessionStorage.getItem("mall")=="Melanium")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([786341,626392,458576,643807])
}
if((sessionStorage.getItem("mall")=="Melanium") && x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,587807,626392])
}
if((sessionStorage.getItem("mall")=="Lulu Mall")&& x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,645708,,676159])
}
if((sessionStorage.getItem("mall")=="Lulu Mall") && x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,587807,626392])
}

if((sessionStorage.getItem("mall")=="Lulu Mall") && x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([786341,739028,645708,587807])
}
if((sessionStorage.getItem("mall")=="Mantri Square")&&x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([786341,739028,645708,587807])
}
if((sessionStorage.getItem("mall")=="Mantri Square")&&x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([739028,626392,676159,587807])
}

if((sessionStorage.getItem("mall")=="Mantri Square") && x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([592508,792750,645708,688618])
}
if((sessionStorage.getItem("mall")=="Garuda Mall") && x.getFullYear()+"-"+month+"-"+preceed[0]+(dateToday)===sessionStorage.getItem("date")){
    getMovieDetails([722913,532865,626392,592508])
}
if((sessionStorage.getItem("mall")=="Garuda Mall") && x.getFullYear()+"-"+month+"-"+preceed[1]+(dateToday+1)===sessionStorage.getItem("date")){
    getMovieDetails([786341,739028,645708,587807])
}
if((sessionStorage.getItem("mall")=="Garuda Mall") && x.getFullYear()+"-"+month+"-"+preceed[2]+(dateToday+2)===sessionStorage.getItem("date")){
    getMovieDetails([739028,626392,676159,587807])
}
}



