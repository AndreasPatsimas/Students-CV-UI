import{ formToJSON } from '../utils/bind.js';

//constant fields
const homeArea = document.querySelector("#homeArea"),

      home = document.querySelector("#home"),

      settings = document.querySelector("#settings"),

      settingsForm = document.querySelector("#settingsForm"),

      settingsArea = document.querySelector("#settingsArea"),

      deleteMyProfile = document.querySelector("#deleteMyProfile"),

      search = document.querySelector("#search_students"),

      searchForm = document.querySelector("#search_form"),

      searchArea = document.querySelector("#searchArea"),
      
      table = document.querySelector("#tableId");



//tabs
home.addEventListener("click", () => {

    homeArea.style.display = "block";

    settingsArea.style.display = "none";

    searchArea.style.display = "none";
});

settings.addEventListener("click", () => {

    homeArea.style.display = "none";

    searchArea.style.display = "none";

    settingsArea.style.display = "block";
});

search.addEventListener("click", () => {

    homeArea.style.display = "none";

    searchArea.style.display = "block";

    settingsArea.style.display = "none";
});

// search operations

//search students by department and work experience

searchForm.addEventListener("submit", (e) => {
    
    e.preventDefault();

    let searchData = formToJSON(searchForm.elements);

    if(document.querySelector("#ckb3").checked === true)
        searchData.workExperience = true;

    else
        searchData.workExperience = false;

    if(searchData.department != 0){
    
        document.querySelector("#departChoice").style.display = "none";

        document.querySelector("#loadingImage").style.display = "block";

        setTimeout(() => {

            document.querySelector("#loadingImage").style.display = "none";
            
            console.log(searchData);

            document.getElementById('id01').style.display='block';

        }, 3000);               

    }
    
    else
        document.querySelector("#departChoice").style.display = "block";

});

//search_table

table.onclick = ("click", "tr", (ap) => {
    
    let clickedRow = ap.path[1];

    if(clickedRow.id != "th"){
        console.log(clickedRow);
        document.getElementById('id02').style.display='block';
    }
})



// settings operations

//profile values
document.querySelectorAll(".profileImage").forEach(image => image.src = "images/pada.jpg");

document.querySelector("#changePhotoLink").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector("#changePhoto").click();
});

//form
settingsForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let settingsData = formToJSON(settingsForm.elements);

    document.querySelector("#loadingIma").style.display = "block";

    console.log(settingsData);

    let isMailUnique = true;

    if(isMailUnique){
        
        setTimeout(() => {

            document.querySelector("#loadingIma").style.display = "none";
            
            document.querySelector("#mailSuccess").style.display = "block";
            
            setTimeout(() => location.reload(), 2000);

        }, 3000);
    }
    
    else{
        setTimeout(() => {

            document.querySelector("#loadingIma").style.display = "none";
            
            document.querySelector("#mailFail").style.display = "block";

        }, 3000);
    }  
        
});

deleteMyProfile.addEventListener("click", () => {
    
    let confirmation = confirm("Are you sure you want to delete your profile?");

    if(confirmation)
        console.log("confirm");
    else
        console.log("No.")
});