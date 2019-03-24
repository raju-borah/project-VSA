// upload page
const realFileBtn = document.getElementById("upload-file");
const customBtn = document.getElementById("choose-video");
const customText = document.getElementById("custom-text");






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


  