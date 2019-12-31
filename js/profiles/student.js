import{ formToJSON } from '../utils/bind.js';
import{ MyHTTP } from '../utils/httpRequest.js';
import{ getDepartment } from '../utils/department.js';

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
.then(student => {
    console.log(student);

    if(student.imagePath != null)
        document.querySelectorAll(".profileImage").forEach(image => image.src = `images/ students/${username}/${student.imagePath}`);
    else
        document.querySelectorAll(".profileImage").forEach(image => image.src = "images/pada.jpg");

    if(student.cv !=null){
        downloadCv.style.display = "block";

        uploadCv.textContent = "CHANGE MY CV";

        if(localStorage.getItem("username") != null)
            localStorage.setItem("cv", `${student.cv.fileName}`)
        else
            sessionStorage.setItem("cv", `${student.cv.fileName}`);
    }
    else{
        downloadCv.style.display = "none";

        uploadCv.textContent = "UPLOAD CV";
    }

    document.getElementById("fullname").textContent = `${student.firstname} ${student.lastname}`;

    if(student.description != null)
        document.getElementById("desc").textContent = `${student.description}`;
    
    document.getElementById("dob").textContent = `${student.dateOfbirth}`;

    document.getElementById("mob").textContent = `${student.mobilePhone}`;

    document.getElementById("mail").textContent = `${student.email}`;

    if(student.workExperience === true){
        
        document.getElementById("nonWorkExp").style.display = "none";

        document.getElementById("workExp").style.display = "";

        document.querySelector("#ckb1").checked = true;
    }
    else{
        
        document.getElementById("nonWorkExp").style.display = "";

        document.getElementById("workExp").style.display = "none";

        document.querySelector("#ckb1").checked = false;
    }

    document.getElementById("depart").textContent = `${getDepartment[student.department]}`;

})
.catch(error => console.log(error) /*location.replace("authenticate.html")*/);


//cv operations

//////////////////
uploadCv.addEventListener("click", () => {
    uploadCvInput.click();
});

const upload = (file) => {

    document.querySelector("#loadingImage").style.display = "block";

    const formData = new FormData();
    
    formData.append('file', file);

    setTimeout(() => {
        fetch(`http://localhost:8080/pada/student/uploadFile/${username}`, { 
            method: 'POST',
            headers: 
            {
            'Authorization': `Tasos ${jwt}`,
            },
            body: formData 
        })
        .then(
        response => response 
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

    let fileName;

    if(localStorage.getItem("username") != null)
        fileName = localStorage.getItem("cv");
    else
        fileName = sessionStorage.getItem("cv");
    
    fetch(`http://localhost:8080/pada/student/downloadFile/${username}/${fileName}`, {
        method: 'GET',
        headers: 
        {
        //'Content-type': 'application/json',
        'Authorization': `Tasos ${jwt}`,
        }
    })
      .then(res => {
        let blob = new Blob([res]);
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = fileName;
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