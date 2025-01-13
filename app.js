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
    alert("Please enter a required fields");
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
    alert(error.message);
  } else {
    alert("signup successfully please verify your email address..");
    console.log(data);
    gologinpage();
  }

  email_inpu.value = "";
  password_inpu.value = "";
  conform_password_inpu.value = "";
  user_name.value = "";
  console.log("signup successfully");
}

async function login() {
  const login_Email = login_email.value;
  const login_Password = login_password.value;

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

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: login_Email,
    password: login_Password,
  });
  if (error) {
    alert(error.message);
  } else {
    alert("login successfully");
    alert(`Welcome, ${data.user.user_metadata.first_name}`);
    window.location.href = "/dashboard.html";
    console.log(data);
    login_email.value = "";
    login_password.value = "";
  }
}
