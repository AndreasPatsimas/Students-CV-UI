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

// profile company

http.get(`http://localhost:8080/pada/company/profile/${username}`, jwt)
.then(company => {

    console.log(company);
    
    // if(company.status === 500)
    //     location.replace("authenticate.html");

    if(company.logoPath != null)
        document.querySelectorAll(".profileImage").forEach(image => image.src = `images/companies/${username}/${company.logoPath}`);
    else
        document.querySelectorAll(".profileImage").forEach(image => image.src = "images/pada.jpg");

    document.querySelector("#company_name").textContent = `${company.companyName}`;

    document.querySelector("#mail").textContent = `${company.email}`;

    document.querySelector("#units").textContent = `${company.units}`;

    document.querySelector("#companyName").value = `${company.companyName}`;

    document.querySelector("#email").value = `${company.email}`;

})
.catch(error => {
    
    console.log(error); 
    
    //location.replace("authenticate.html");
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
        console.log(clickedRow.getElementsByTagName("td")[2].textContent);
        document.getElementById('id02').style.display='block';
    }
})



// settings operations

//profile values

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

    if(confirmation){

        http.delete(`http://localhost:8080/pada/user/delete/profile/${username}`, jwt)
            .then(res => {
                console.log(res);

                localStorage.removeItem("username");

                localStorage.removeItem("jwt");

                sessionStorage.removeItem("username");

                sessionStorage.removeItem("jwt");

                location.replace("authenticate.html");
            })
            .catch(error => console.log(error));
    }
        
    else
        console.log("No.")
});

// change password

changePasswordLink.addEventListener("click", () => {

    document.querySelector('#id04').style.display='block';
});
document.querySelector("#username").value = username;
changePasswordForm.addEventListener("submit", (e) => {

    e.preventDefault();

    document.querySelector("#changeSuccess").style.display = "none";

    document.querySelector("#changeFail").style.display = "none";

    let data = formToJSON(changePasswordForm.elements);

    if(data.newPassword === data.repeatPass){

        document.querySelector('#diffPassw').style.display='none';

        delete data.repeatPass;

        document.querySelector("#loadingImag").style.display = "block";

        http.authenticatedPost("http://localhost:8080/pada/authenticate/changePassword", data, jwt)
        .then(res => {
            if(res.errorCode !== 406){
                document.querySelector("#loadingImag").style.display = "none";
                
                document.querySelector("#changeSuccess").style.display = "block";
            }
            else{
                document.querySelector("#loadingImag").style.display = "none";
            
                document.querySelector("#changeFail").style.display = "block";
            }
        })
        .catch(res => {
            console.log(res);
            document.querySelector("#loadingImag").style.display = "none";
            
            document.querySelector("#changeFail").style.display = "block";
        });
    }
    else
        document.querySelector('#diffPassw').style.display='block';

});