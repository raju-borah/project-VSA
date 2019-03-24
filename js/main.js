

//to fade the header section on scroll
function opacity() {
    var head = document.querySelector(".head");
  
    //height of the content area that is visible on screen
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
  
    //increase or decrease the opacity according to the scroll 
    head.style.opacity = (height - scrollTop) / height;

};


window.addEventListener("scroll",opacity);//header opacity
