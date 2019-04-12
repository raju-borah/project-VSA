//to fade the header section on scroll
const opacity = () => {
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
    height = height / 0.9;

    //increase or decrease the opacity according to the scroll 
    head.style.opacity = (height - scrollTop) / height;
};

window.addEventListener("scroll", opacity);//header opacity



