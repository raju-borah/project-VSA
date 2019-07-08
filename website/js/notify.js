//btn to open the form
const notifyBtn=document.querySelector('.notibutton');

////name of the editform
const notificationpanel=document.querySelector('.notify');

// btn to close the form
const closebtn=document.querySelector('.notify_panel--close');


// When the user clicks the button, open the modal 
notifyBtn.addEventListener('click',() =>{
    notificationpanel.style.display = "block";
})

//when the user click the close btn form is closed
closebtn.addEventListener('click',() =>{
    notificationpanel.style.display = "none";
})