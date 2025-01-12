const swich_login = document.getElementById("swich_login");
const swich_Signup = document.getElementById("swich_Signup");
const login_container = document.querySelector(".login_container");
const Signup_container = document.querySelector(".Signup_container");
const email_inpu = document.getElementById("email_inpu");
const password_inpu = document.getElementById("password_inpu");
const conform_password_inpu = document.getElementById("conform_password_inpu");
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const login_btn = document.getElementById("login_btn");
const signup_btn = document.getElementById("Signup_btn");
const para = document.getElementById("para1");
const user_name = document.getElementById("username");
// console.log(para)
// console.log(email_inpu,password_inpu,conform_password_inpu,signup_btn,login_btn)

// console.log(swich_Signup,swich_login, login_container ,Signup_container)

function gologinpage() {
  // console.log('h.r')
  login_container.classList.remove("hidden");
  Signup_container.classList.add("hidden");
}
function gosignuppage() {
  // console.log('hello')
  login_container.classList.add("hidden");
  Signup_container.classList.remove("hidden");
}
function signup() {
  // console.log('hey')

  const email = email_inpu.value;
  const password = password_inpu.value;
  const conform_password = conform_password_inpu.value;
  const name = user_name.value;
  console.log(name, email, password, conform_password);
  const symbol = email.indexOf("@gmail.com");
  if (
    !email_inpu.value ||
    !password_inpu.value ||
    !conform_password_inpu.value
  ) {
    alert("plz Enter a required fields");
    return;
  }
  if (symbol == -1) {
    alert("plz Enter a correct Email");
    return;
  }
  if (conform_password != password) {
    alert("plz match your password");

    return;
  }

  if (password_inpu.value.length < 8) {
    alert("plz Enter a 8 character password");
    return;
  }
  email_inpu.value = "";
  password_inpu.value = "";
  conform_password_inpu.value = "";
  user_name.value = "";
  console.log("signup successfully");
}

function login() {
  // console.log("h.r")

  const login_Email = login_email.value;
  const login_Password = login_password.value;
  console.log(login_Email, login_Password);

  const symbol = login_Email.indexOf("@gmail.com");
  if (!login_email.value || !login_password.value) {
    alert("plz Enter a required fields");
    return;
  }
  if (symbol == -1) {
    alert("plz Enter a correct Email");
    return;
  }
  if (login_password.value.length < 8) {
    alert("plz Enter a 8 character password");
    return;
  }
  login_email.value = "";
  login_password.value = "";
  console.log("login successfully");
}
