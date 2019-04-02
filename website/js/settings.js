// current profile image
const profileimg=document.querySelector("#profileimage");
// upload button
const imageUpload=document.querySelector("#imageupload");
// custom button for upload
const editImageButton=document.querySelector("#editprofileimage");

// save Edit image button clicked button
editImageButton.addEventListener('click',function(){
imageUpload.click();
});

/* 
imageUpload.addEventListener('change',function(){

});
*/