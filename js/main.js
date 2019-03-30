//to fade the header section on scroll
function opacity() {
    const head = document.querySelector(".head");

    //height of the content area that is visible on screen
    let height = window.innerHeight;
    let scrollTop;
    if (window.pageYOffset !== undefined) {
        scrollTop = window.pageYOffset;
    }
    else {
        scrollTop = document.documentElement || document.body.parentNode;
    }

    // Change this if you want it to fade faster
    height = height / 1.1;

    //increase or decrease the opacity according to the scroll 
    head.style.opacity = (height - scrollTop) / height;
};

window.addEventListener("scroll", opacity);//header opacity




// user profile button in navbar
const userBtn=document.querySelector('.userbutton');
// div for data display
const userContainer=document.querySelector('.usercontainer');
// user option division 
const signindetail=document.querySelector('.signincontainer');
// not sign in division
const notsigin=document.querySelector('.notsignincontainer');

userBtn.addEventListener('click',function(){
    
    

    if(userContainer.style.display==="none"){
        signindetail.style.display="block";
        userContainer.style.display="block";
    
    }else{
        userContainer.style.display="none";
        signindetail.style.display="none";
        
    }
    
    /**
        if(userContainer.style.display==="none"){
            notsigin.style.display="block";
            userContainer.style.display="block";
           
        }else{
            userContainer.style.display="none";
            notsigin.style.display="none";
        
        }
        */   
    
});
