var apikey="6af5e413e17f42d047fcc0b61f2c0618";
var $overview=document.getElementById("overview");
var $reldate=document.getElementById("rel-date");
var $iframe=document.getElementById("ifrm");

getMovieDetails()

function getMovieDetails(){
   var getMovieId=sessionStorage.getItem("movie");                        //get the movie id and use this id only we got trailer from the API
   var id=Number(getMovieId);
   axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
   .then(response=>getTrailerKey(response.data))
   function getTrailerKey(val){
       axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`)//trailer fetching in API
       .then(response=>{
       console.log(response.data.results[0])
       if(response.data.results[0]){
          showTrailer(val,response.data.results[0])
       }
       else{showTrailer(val,"null")}//if trailer not found for the movie
       })
    }
}
function showTrailer(val,values){
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


