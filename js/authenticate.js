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

      reqResisterMessageAgreeTerms = document.querySelector("#reqResisterMessageAgreeTerms");

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

const studentRegistration = (username, password) => {
    console.log(username, password);

    document.getElementById('id02').style.display='block';
}

const companyRegistration = (username, password) => {
    console.log(username, password);
}

document.querySelector("#registerAsStudent").addEventListener("click", () => {

    studentRegistration(registerUsername.value, registerPass.value);
});

document.querySelector("#registerAsCompany").addEventListener("click", () => {

    companyRegistration(registerUsername.value, registerPass.value);
});


