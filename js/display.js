

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
    

    
    if(display==="none"){
        notsigin.style.display="block";
        userContainer.style.display="block";
        display="block";
       
    }else{
        userContainer.style.display="none";
        notsigin.style.display="none";
    
    }
    
     /**

  if(display==="none"){
        signindetail.style.display="block";
        userContainer.style.display="block";
      display="block";
       
    }else{
        userContainer.style.display="none";
        signindetail.style.display="none";
        
    }
     */  
   
    
});
