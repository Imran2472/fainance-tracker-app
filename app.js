const supabaseUrl = "https://asmdqoxecgvlyxwstgyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbWRxb3hlY2d2bHl4d3N0Z3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODI0MDYsImV4cCI6MjA1MTE1ODQwNn0.m9DZLk8FX4ElPUb6bQZwz3OPmtfUyjUdKlO0I_8Bqwg";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

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

function gologinpage() {
  login_container.classList.remove("hidden");
  Signup_container.classList.add("hidden");
}
function gosignuppage() {
  login_container.classList.add("hidden");
  Signup_container.classList.remove("hidden");
}
async function signup() {
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
    Toastify({
      text: "Please enter a required fields",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }
  if (symbol == -1) {
    Toastify({
      text: "please Enter a correct Email Address",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }
  if (conform_password != password) {
    Toastify({
      text: "please match your password",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }

  if (password_inpu.value.length < 8) {
    Toastify({
      text: "please Enter a 8 character password",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name,
      },
    },
  });
  if (error) {
    Toastify({
      text: `${error.message}`,
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
  } else {
    Toastify({
      text: "signup successfully please verify your email address...",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
    gologinpage();
  }

  email_inpu.value = "";
  password_inpu.value = "";
  conform_password_inpu.value = "";
  user_name.value = "";
}

async function login() {
  const login_Email = login_email.value;
  const login_Password = login_password.value;

  const symbol = login_Email.indexOf("@gmail.com");
  if (!login_email.value || !login_password.value) {
    Toastify({
      text: "please Enter a required fields",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }
  if (symbol == -1) {
    Toastify({
      text: "please Enter a correct Email",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }
  if (login_password.value.length < 8) {
    Toastify({
      text: "Please enter password greater than 8 characters",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: login_Email,
    password: login_Password,
  });
  if (error) {
    Toastify({
      text: `${error.message}`,
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        // background: "#16A34A",
        // red
        background: "#DC2626",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Login successfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        // green
        background: "#16A34A",
        // red
        // background: "#DC2626",
      },
    }).showToast();
    setTimeout(() => {
      Toastify({
        text: `Welcome, ${data.user.user_metadata.first_name}`,
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          // green
          background: "#16A34A",
          // red
          // background: "#DC2626",
        },
      }).showToast();
    }, 1000);
    login_email.value = "";
    login_password.value = "";
    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 2000);
  }
}
