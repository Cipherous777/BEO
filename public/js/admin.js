// variables and constant intialization
let password = document.getElementById("password");

function myfun(event) {
  event.preventDefault();
  if (password.value === "BEOADMINPAGE123#@!") {
    window.location.href = "/admin-option";
  } else {
    window.location.href = "/admin";
  }
}
