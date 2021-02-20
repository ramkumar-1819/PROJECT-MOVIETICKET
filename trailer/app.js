var apikey="6af5e413e17f42d047fcc0b61f2c0618";
var $overview=document.getElementById("overview");
var $reldate=document.getElementById("rel-date");
var $iframe=document.getElementById("ifrm");

fun()
function fun(){
   var x=sessionStorage.getItem("movie");//get the movie id and use this id only we got trailer from the API
   var id=Number(x);
   axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
   .then(response=>key(response.data))

function key(val){
   axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`)//trailer fetching in API
      .then(response=>{
      console.log(response.data.results[0])
      if(response.data.results[0]){
          perform(val,response.data.results[0])
      }
      else{perform(val,"null")}//if trailer not found for the movie
      })
}
}
function perform(val,values){
    if(values=="null"){
       document.getElementById("trail").style.display="block";
    }
    else{
        console.log(values.key)
        $iframe.src=`https://www.youtube.com/embed/${values.key}`;
    }
    $overview.innerHTML+=val.overview
    $reldate.innerHTML+=val.release_date;
    
}


