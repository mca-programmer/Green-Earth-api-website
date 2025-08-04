function generateEmail() {
  var name = document.getElementById("name").value.trim();
  var roll = document.getElementById("roll").value.trim();
  var department = document.getElementById("department").value.trim();

  if (name === "" || roll === "" || department === "") {
    document.getElementById("output").innerText = "Please fill all fields.";
    document.getElementById("output").style.color = "red";
  } else {
    var email = name + roll + "." + department + "@ph.ac.bd";
    document.getElementById("output").innerText = email;
    document.getElementById("output").style.color = "green";
  }
}
