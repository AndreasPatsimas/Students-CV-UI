const title = document.querySelector("#title");

const backImageTitle = document.querySelector("#backImageTitle");

//Login Form
const loginForm = document.querySelector("#loginForm");

const switchToRegisterLink = document.querySelector("#switchToRegisterLink");

//Register Form
const registerForm = document.querySelector("#registerForm");

const switchToLoginLink = document.querySelector("#switchToLoginLink");

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