//not the scroll position at the starting of page loading
let prevScrollpos = window.pageYOffset;//at starting it is 0
             

const navposition = () => {

//note the scroll position while scrolling on the page
let currentScrollPos = window.pageYOffset;//increases as we scroll down and decreses as we scroll up


//if we scroll up it will show the scroll bar
  if (prevScrollpos > currentScrollPos) {
      document.querySelector(".navigationbar").style.opacity = "1";//show the navbar
  } 
  
  else {
    //else hide it when we go down
    document.querySelector(".navigationbar").style.opacity = "0";//hide the navbar
  }

  //using the current scroll position to compare with previous postion
  prevScrollpos = currentScrollPos;
  
}

//call the function navposition
window.addEventListener("scroll", navposition);