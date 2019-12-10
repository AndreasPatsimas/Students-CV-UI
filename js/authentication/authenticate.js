import{ formToJSON } from '../utils/bind.js';

const title = document.querySelector("#title"),

      backImageTitle = document.querySelector("#backImageTitle");

//Login Form
const loginForm = document.querySelector("#loginForm"),

      switchToRegisterLink = document.querySelector("#switchToRegisterLink");

//Register Form
const registerForm = document.querySelector("#registerForm"),

      switchToLoginLink = document.querySelector("#switchToLoginLink");

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


//Login
loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let authenticationData = formToJSON(loginForm.elements);

    if(document.querySelector("#ckb1").checked === true)
        authenticationData.remember = true;

    else
        authenticationData.remember = false;

    document.querySelector("#loginbtn").style.display = "none";

    document.querySelector("#loadingImag").style.display = "block";

    console.log(authenticationData);

    let authenticated = true;

    let isStudent = true;

    setTimeout(() => {

        document.querySelector("#loadingImag").style.display = "none";
        
        document.querySelector("#loginbtn").style.display = "block";

        if(authenticated){

            if(isStudent)
                location.replace("student.html");

            else
                location.replace("company.html")
        }
        
        else
            document.querySelector("#authFail").style.display = "block";

    }, 3000);
});



