import{ formToJSON } from '../utils/bind.js';

//constant fields
const homeArea = document.querySelector("#homeArea"),

      home = document.querySelector("#home"),

      settings = document.querySelector("#settings"),

      settingsForm = document.querySelector("#settingsForm"),

      settingsArea = document.querySelector("#settingsArea"),

      deleteMyProfile = document.querySelector("#deleteMyProfile"),

      search = document.querySelector("#search_students"),

      searchArea = document.querySelector("#searchArea");



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

// https://colorlib.com/wp/free-css3-html5-search-form-examples/
// https://colorlib.com/wp/css3-table-templates/

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