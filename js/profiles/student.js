import{ formToJSON } from '../utils/bind.js';

//constant fields
const homeArea = document.querySelector("#homeArea"),

      home = document.querySelector("#home"),

      settings = document.querySelector("#settings"),

      settingsForm = document.querySelector("#settingsForm"),

      settingsArea = document.querySelector("#settingsArea"),

      deleteMyProfile = document.querySelector("#deleteMyProfile"),
      
      uploadCv = document.querySelector("#upload"),

      uploadCvInput = document.querySelector("#uploadCV"),
      
      downloadCv = document.querySelector("#download"),

      downloadLink = document.createElement('a');

      downloadLink.style.display = "none";

//tabs
home.addEventListener("click", () => {

    homeArea.style.display = "block";

    settingsArea.style.display = "none";
});

settings.addEventListener("click", () => {

    homeArea.style.display = "none";

    settingsArea.style.display = "block";
});

//profile values
document.querySelectorAll(".profileImage").forEach(image => image.src = "images/pada.jpg")


//document.querySelector("#ckb1").checked = true;
//document.querySelector("#ckb1").checked = false;

//document.querySelector("#dob").value = "2014-02-09";

//cv operations
let isCvUploaded = true;

if(isCvUploaded){

    downloadCv.style.display = "block";

    uploadCv.textContent = "CHANGE MY CV";
}
else{

    downloadCv.style.display = "none";

    uploadCv.textContent = "UPLOAD CV";
}

//////////////////
uploadCv.addEventListener("click", () => {
    uploadCvInput.click();
});

const upload = (file) => {

    const formData = new FormData();
    
    formData.append('file', file);

    fetch('http://localhost:8080/files/uploadFile', { 
    method: 'POST',
    body: formData 
  }).then(
    response => response.json() 
  ).then(
    success => console.log(success) 
  ).catch(
    error => console.log(error) 
  );

};

const onSelectFile = () => upload(uploadCvInput.files[0]);

uploadCvInput.addEventListener('change', onSelectFile, false);

////////////////

downloadCv.addEventListener("click", () => {
    console.log("download");
    
    fetch("http://localhost:8080/files/downloadFile/LICENSE.txt", {
        method: 'GET',
    })
      .then(res => {
        let blob = new Blob([res]);
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "LICENSE.txt";
        downloadLink.click();
        
        })
      .then(()=> console.log("success"))
      .catch(err => console.log(err));
    
});

// settings operations
//image
document.querySelector("#changePhotoLink").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector("#changePhoto").click();
});

//form
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

deleteMyProfile.addEventListener("click", () => {
    
    let confirmation = confirm("Are you sure you want to delete your profile?");

    if(confirmation)
        console.log("confirm");
    else
        console.log("No.")
});