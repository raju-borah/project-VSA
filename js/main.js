//display serach option
document.querySelector('.statusBar__item--icon').addEventListener('click',function()
{
    document.querySelector('.search').style.display = 'block';
    console.log("done");

}
);


document.querySelector('.statusBar__close').addEventListener('click',function()
{
    document.querySelector('.search').style.display = 'none';
    console.log("done");

}
);


//sticky status bar
let navbar = document.querySelector('.navbar');

let sticky = navbar.offsetTop;

console.log(sticky);

function position(){

    if(window.pageYOffset >= sticky)
    {

        navbar.classList.add("fixed");
        document.querySelector('.statusBar__item--icon').style.display = 'none';
        document.querySelector('.navbar').style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";

    }
    else{

        navbar.classList.remove("fixed");
        document.querySelector('.statusBar__item--icon').style.display = 'block';
        document.querySelector('.navbar').style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";
    }
}





window.onscroll = function()
{
    position();
}

