//display serach option
document.querySelector('.statusBar__item--icon').addEventListener('click',function()
{
    document.querySelector('.search').style.display = 'block';
    console.log("done");

}
);

//to close the search bar
document.querySelector('.statusBar__close').addEventListener('click',function()
{
    document.querySelector('.search').style.display = 'none';
    console.log("done");

}
);






//To stick the  status bar on top
    
let navbar = document.querySelector('.navbar');

//to get the starting postion of statusbar
let sticky = navbar.offsetTop;

console.log(sticky);
function position(){



    if(window.pageYOffset >= sticky)
    {

        navbar.classList.add("fixed");
        document.querySelector('.statusBar__item--icon').style.display = 'none';
        navbar.style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";

    }
    else{

        navbar.classList.remove("fixed");
        document.querySelector('.statusBar__item--icon').style.display = 'block';
        navbar.style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";
    }
}







//to fade the header section on scroll
 function opacity() {
    var head = document.querySelector(".head");
  
    //height of the window
    var height = window.innerHeight;
    console.log(height);//486
    
  
                    if(window.pageYOffset !== undefined)
                    {
                        var scrollTop =  window.pageYOffset ;
                    }
                    else{
                         scrollTop =(document.documentElement  || document.body.parentNode );
                    }
                    console.log(scrollTop);
  
    // Change this if you want it to fade faster
    height = height / 1;
  
    head.style.opacity = (height - scrollTop) / height;
  
  };




  function height() {
    var head = document.querySelector(".header");
  
    //height of the window
    var height = window.innerHeight;
    console.log(height);//486
    
  
                    if(window.pageYOffset !== undefined)
                    {
                        var scrollTop =  window.pageYOffset ;
                    }
                    else{
                         scrollTop =(document.documentElement  || document.body.parentNode );
                    }
                    console.log(scrollTop);
  
    // Change this if you want it to fade faster
    height = height / 1;
  
    head.style.height = (height - scrollTop) / height;
  
  };




//call on scroll event for 
window.addEventListener("scroll",position);//status bar
window.addEventListener("scroll",opacity);//header opacity
window.addEventListener("scroll",height);//header opacity