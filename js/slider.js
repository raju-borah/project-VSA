let slideIndex = 0;//this indicates to start from the first image 

showSlides();

function showSlides() {
  

  //array is needed to to get the length of images
  //here 3 images are used 0,1,2
  const nodelist = document.querySelectorAll(".mySlides");

  //convert the nodelist to array
  const slides = Array.from(nodelist);
  
  console.log(slides);//0,1,2
  
  //the loop is to hide the current image 
  slides.forEach(cur => cur.style.display = "none"  );
  


  //increase the sildeindex to go to next image
  slideIndex++;
  
  //is slideindex increses more than the length of the array
  if (slideIndex > slides.length) {
  slideIndex = 1;
  }    

  //to display the image 
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 10000); // Change image every 10 seconds
}