//btn to open the form
const editBtn=document.querySelector('.editbtn');

////name of the editform
const editform=document.querySelector('.editpanel');

// btn to close the form
const closebtn=document.querySelector('.close');


// When the user clicks the button, open the modal 
editBtn.addEventListener('click',() =>{
  editform.style.display = "block";
})

//when the user click the close btn form is closed
closebtn.addEventListener('click',() =>{
 editform.style.display = "none";
})