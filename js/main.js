

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





window.addEventListener("scroll",opacity);//header opacity



//To stick the  status bar on top
    
//let navbar = document.querySelector('.navigationbar');

//to get the starting postion of statusbar
let sticky = navbar.offsetTop;

console.log(sticky);
function position(){



    if(window.pageYOffset >= 0)
    {

        navbar.classList.add("fixed");
        navbar.style.display = 'none';
        navbar.style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";

    }
   else{

      navbar.classList.remove("fixed");
       navbar.style.display = 'block';
        navbar.style.backgroundImage ="linear-gradient(to right,rgba(46, 19, 199, 0.800),rgba(18, 207, 240, 0.400))";
    }
}
//window.addEventListener("scroll",position);//header opacity

