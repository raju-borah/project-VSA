


// user profile button in navbar
const userBtn=document.querySelector('.userbutton');
// div for data display
const userContainer=document.querySelector('.usercontainer');
// user option division 
const signindetail=document.querySelector('.signincontainer');
// not sign in division
const notsigin=document.querySelector('.notsignincontainer');

let display="none";
userBtn.addEventListener('click',function(){
    // change to see the effect in home page

      
// when user is not SIGNED IN ,then following codes execute
   
   /* if(display==="none"){
        notsigin.style.display="block";
        userContainer.style.display="block";
        display="block";
       
    }else{
        userContainer.style.display="none";
        notsigin.style.display="none";
        display="none";
    }
 */  
     
//when user is SIGNED IN ,then following codes execute
  if(display==="none"){
        signindetail.style.display="block";
        userContainer.style.display="block";
      display="block";
       
    }else{
        userContainer.style.display="none";
        signindetail.style.display="none";
        display="none";
        
    }
   
  
    
});


