import{ formToJSON } from '../utils/bind.js';

//constant fields
const homeArea = document.querySelector("#homeArea"),

      home = document.querySelector("#home"),

      settings = document.querySelector("#settings"),

      settingsForm = document.querySelector("#settingsForm"),

      settingsArea = document.querySelector("#settingsArea"),
      
      uploadCv = document.querySelector("#upload"),
      
      downloadCv = document.querySelector("#download");

//tabs
home.addEventListener("click", () => {

    homeArea.style.display = "block";

    settingsArea.style.display = "none";
});

settings.addEventListener("click", () => {

    homeArea.style.display = "none";

    settingsArea.style.display = "block";
});

//document.querySelector("#ckb1").checked = true;
//document.querySelector("#ckb1").checked = false;

//document.querySelector("#dob").value = "2014-02-09";

//cv operations
let isCvUploaded = true;

if(!isCvUploaded)
    downloadCv.style.display = "block";
else
    downloadCv.style.display = "none";

uploadCv.addEventListener("click", () => {
    console.log("upload");
});

downloadCv.addEventListener("click", () => {
    console.log("download");
});

// settings operations
settingsForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let settingsData = formToJSON(settingsForm.elements);

    if(document.querySelector("#ckb1").checked === true)
        settingsData.workExperience = true;

    else
        settingsData.workExperience = false;

        if(settingsData.mobilePhone.trim() === "" || settingsData.mobilePhone.length == 10){
            
            document.querySelector("#mobReq").style.display = "none";

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
            
             
        }
        else
            document.querySelector("#mobReq").style.display = "block";
});

