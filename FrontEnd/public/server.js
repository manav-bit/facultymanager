

const form = document.getElementById('form');
form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  if (document.getElementById("email").value == "") {
    alert("Please enter an email address");
    return false;
}
if (document.getElementById("password").value == "") {
    alert("Please enter a password");
    return false;
}

if (document.getElementById("confirmPassword").value == "") {
  alert("Please enter a confirmPassword");
  return false;
}
// Check if the password is strong enough
var password = document.getElementById("password").value;
if (password.length < 8) {
  alert("The password must be at least 8 characters long");
  return false;
}
if (!/[a-zA-Z]/.test(password)) {
  alert("The password must contain at least one letter");
  return false;
}
if (!/[0-9]/.test(password)) {
  alert("The password must contain at least one number");
  return false;
}
// Check if the email address is valid
var email = document.getElementById("email").value;
if (!/.*@.*\..*/.test(email)) {
  alert("The email address is not valid");
  return false;
}
var confirmPassword = document.getElementById("confirmPassword").value
console.log(password, confirmPassword)
if(password!=confirmPassword){
alert("Password and confirm password do not match")
return false;
}
// All validations passed, submit the form
console.log("done")
form.submit();
return true;


  // All validations passed, submit the form
  
  
}
