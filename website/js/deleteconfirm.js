// delete button class
const delbtn=document.querySelector('.videodelete');
// confirmation message box division
const confirmbox=document.querySelector('.dashboard__deletemsg_container');
// for NO option 
const optionNO=document.querySelector('.btn__confirm--btn--no');
// the parent division 
const containerElement = document.querySelector('.dashboard');
// when delete button clicked
delbtn.addEventListener('click',function(){
    confirmbox.style.display="block";
    containerElement.setAttribute('class', 'blur');    
});
// make sure to disable the button
// un blur code
// when the NO option is clicked
optionNO.addEventListener('click',function(){
    confirmbox.style.display="none";
    containerElement.setAttribute('class', null);    

});

