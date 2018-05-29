function updateSubmitButton() 
{
  var email = document.getElementById("email").value;

  if(validEmail(email))
  {
    document.getElementById("submitBtn").disabled = false;
  }
  else
    document.getElementById("submitBtn").disabled = true;
}

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function recoverUsername()
{
  document.getElementById("submit-info").style.display = "block";
  document.getElementById("email").value = "";
}