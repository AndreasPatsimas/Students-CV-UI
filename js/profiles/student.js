import{ formToJSON } from '../utils/bind.js';
import{ MyHTTP } from '../utils/httpRequest.js';

const http = new MyHTTP;

//get storage
let username;

let jwt;

if(localStorage.getItem("username") == null && sessionStorage.getItem("username") == null)
    location.replace("authenticate.html");

else if(localStorage.getItem("username") != null){

    username = localStorage.getItem("username");

    jwt = localStorage.getItem("jwt");
}
else{

    username = sessionStorage.getItem("username");

    jwt = sessionStorage.getItem("jwt")
}

//constant fields
const homeArea = document.querySelector("#homeArea"),

      home = document.querySelector("#home"),

      settings = document.querySelector("#settings"),

      settingsForm = document.querySelector("#settingsForm"),

      settingsArea = document.querySelector("#settingsArea"),

      changePasswordLink = document.querySelector("#change_password"),

      changePasswordForm = document.querySelector("#changePasswordForm"),

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
//console.log(jwt);
http.get(`http://localhost:8080/pada/student/profile/${username}`, jwt)
.then(response => console.log(response))
.catch(error => console.log(error) /*location.replace("authenticate.html")*/);

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

    document.querySelector("#loadingImage").style.display = "block";

    const formData = new FormData();
    
    formData.append('file', file);

    setTimeout(() => {
        fetch('http://localhost:8080/files/uploadFile', { 
            method: 'POST',
            body: formData 
        })
        .then(
        response => response.json() 
        )
        .then((data)=> {
        
            console.log(data);
    
            document.querySelector("#loadingImage").style.display = "none";
    
            document.querySelector("#uploadSuccess").style.display = "block";
    
            setTimeout(() => {
    
            document.querySelector("#uploadSuccess").style.display = "none";
    
            }, 5000);
        })
        .catch(
            error => console.log(error) 
        );
    }, 3000);

};

const onSelectFile = () => upload(uploadCvInput.files[0]);

uploadCvInput.addEventListener('change', onSelectFile, false);

////////////////

downloadCv.addEventListener("click", () => {
    
    fetch("http://localhost:8080/files/downloadFile/LICENSE.txt", {
        method: 'GET',
    })
      .then(res => {
        let blob = new Blob([res]);
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "LICENSE.txt";
        downloadLink.click();
        
        })
      .then(()=> console.log("download success"))
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
                    
                    //setTimeout(() => location.reload(), 2000);

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

// change password
//console.log(changePasswordLink);
changePasswordLink.addEventListener("click", () => {

    document.querySelector('#id04').style.display='block';
});
document.querySelector("#username").value = "sotos";
changePasswordForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let data = formToJSON(changePasswordForm.elements);

    if(data.newPassword === data.repeatPass){

        document.querySelector('#diffPassw').style.display='none';

        delete data.repeatPass;

        document.querySelector("#loadingImag").style.display = "block";

        console.log(data);
    }
    else
        document.querySelector('#diffPassw').style.display='block';

})