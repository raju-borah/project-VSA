let learn = document.querySelector(".morehead__learntext");
let event = document.querySelector(".morehead__eventtext");
let club = document.querySelector(".morehead__clubtext");

const move = () => {

    if(pageYOffset == "30px" )
    {
        learn.style.position = "sticky";
        event.style.position = "sticky";
        club.style.position = "sticky";

    }

    else{
        
    }

}

