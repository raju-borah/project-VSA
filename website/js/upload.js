// upload page
// update note: change getElement to querySelector
const realFileBtn = document.querySelector("#upload-file");
const customBtn = document.querySelector("#choose-video");
const customText = document.querySelector(".custom-text");

// when choose a file button clicked
customBtn.addEventListener('click',function(){
    realFileBtn.click();
});

realFileBtn.addEventListener("change",function(){
if(realFileBtn.value)
{
   
        // regular expersion for finding the file name
    customText.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
}else
{
    customText.innerHTML = "No file choosen yet!";

}
});


  