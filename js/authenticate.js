const title = document.querySelector("#title"),

      backImageTitle = document.querySelector("#backImageTitle");

//Login Form
const loginForm = document.querySelector("#loginForm"),

      switchToRegisterLink = document.querySelector("#switchToRegisterLink");

//Register Form
const registerForm = document.querySelector("#registerForm"),

      switchToLoginLink = document.querySelector("#switchToLoginLink"),

      forwardToRegisterAsAstudentOrACompany = document.querySelector("#forwardToRegisterAsAstudentOrACompany"),

      registerUsername = document.querySelector("#registerUsername"),

      reqResisterMessageUsername = document.querySelector("#reqResisterMessageUsername"),

      registerPass = document.querySelector("#registerPass"),

      reqResisterMessagePassword = document.querySelector("#reqResisterMessagePassword"),

      registerRepeatPass = document.querySelector("#registerRepeatPass"),

      reqResisterMessageRepeatPassword = document.querySelector("#reqResisterMessageRepeatPassword"),

      agreeTerms = document.querySelector("#ckb2"),

      reqResisterMessageAgreeTerms = document.querySelector("#reqResisterMessageAgreeTerms"),

      studentForm = document.querySelector("#studentForm");

//Operations
switchToRegisterLink.addEventListener("click", () => {

    title.textContent = "Sign up";

    backImageTitle.textContent = "Sign Up";

    loginForm.style.display = "none";

    registerForm.style.display = "block";
});

switchToLoginLink.addEventListener("click", () => {

    title.textContent = "Sign in";

    backImageTitle.textContent = "Sign In";

    registerForm.style.display = "none";

    loginForm.style.display = "block";
});


//Forward to choose if you are a student or a company
forwardToRegisterAsAstudentOrACompany.addEventListener("click", () => {
   
    if(registerUsername.value.trim() === "")
        reqResisterMessageUsername.style.display = "block";
    
    else
        reqResisterMessageUsername.style.display = "none";

    if(registerPass.value.trim() === "")
        reqResisterMessagePassword.style.display = "block";

    else
        reqResisterMessagePassword.style.display = "none";
    

    if(registerRepeatPass.value.trim() === "")
        reqResisterMessageRepeatPassword.style.display = "block";

    else
        reqResisterMessageRepeatPassword.style.display = "none"; 
    
    
    
    if(agreeTerms.checked === false)
        reqResisterMessageAgreeTerms.style.display = "block";

    else
        reqResisterMessageAgreeTerms.style.display = "none"; 
    
    if(registerUsername.value.trim() != "" && registerPass.value.trim() != "" && 
    
        registerRepeatPass.value.trim() != "" && agreeTerms.checked === true){

            if(registerPass.value === registerRepeatPass.value){

                document.getElementById("diffPassw").style.display='none';

                document.getElementById('id01').style.display='block';
            }

            else
                document.getElementById("diffPassw").style.display='block';
    }
    
});

//Student Registration
const studentRegistration = (username, password) => {
    
    let studentData = formToJSON(studentForm.elements);
    
    studentData.username = username;

    studentData.password = password;

    if(document.querySelector("#ckb3").checked === true)
        studentData.workExperience = true;
    
    else
        studentData.workExperience = false;

    
    if(studentData.department != 0){
        
        document.querySelector("#departChoice").style.display = "none";
        
        if(studentData.mobilePhone.trim() === "" || studentData.mobilePhone.length == 10){
            
            document.querySelector("#mobReq").style.display = "none";

            document.querySelector("#loadingImage").style.display = "block";

            console.log(studentData);

            setTimeout(() => {

                document.querySelector("#loadingImage").style.display = "none";
                
                location.reload();
                
            }, 3000);
             
        }
        else
            document.querySelector("#mobReq").style.display = "block";
    }
    
    else
        document.querySelector("#departChoice").style.display = "block";
}

const companyRegistration = (username, password) => {
    console.log(username, password);
}

document.querySelector("#registerAsStudent").addEventListener("click", () => {

    document.getElementById('id02').style.display='block';

});

document.querySelector("#registerAsCompany").addEventListener("click", () => {

    companyRegistration(registerUsername.value, registerPass.value);
});

studentForm.addEventListener("submit", (e) => {
        
    e.preventDefault();

    studentRegistration(registerUsername.value, registerPass.value);
});


//Login
loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let authenticationData = formToJSON(loginForm.elements);

    console.log(authenticationData);
});


const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    data[element.name] = element.value;
    return data;

  }, {});


