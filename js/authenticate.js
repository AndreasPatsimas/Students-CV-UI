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
   
    if(registerUsername.value.trim() === ""){
        reqResisterMessageUsername.style.display = "block";
    }

    if(registerPass.value.trim() === ""){
        reqResisterMessagePassword.style.display = "block";
    }

    if(registerRepeatPass.value.trim() === ""){
        reqResisterMessageRepeatPassword.style.display = "block";
    }
    
    if(agreeTerms.checked == false){
        reqResisterMessagePassword.style.display = "block";
    }
});