//  for createplaylist division selection
const createplaylist=document.querySelector("#createplaylist");
//  for existing playlist division selection
const existingplaylist=document.querySelector("#existingplaylist");
// radio button for create playlist and existing playlist

const crplaylist=document.querySelector("#playlistopt1");
const explaylist=document.querySelector("#playlistopt2");



crplaylist.addEventListener('click',function(){
    createplaylist.style.display="block";
    existingplaylist.style.display="none";

});

explaylist.addEventListener('click',function(){
    existingplaylist.style.display="block";
    createplaylist.style.display="none";

});