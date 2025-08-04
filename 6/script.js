function calculateSalary() {
  var startingSalary = parseFloat(document.getElementById("salary").value);
  var experience = parseInt(document.getElementById("experience").value);
  var resultBox = document.getElementById("resultBox");

  if (isNaN(startingSalary) || isNaN(experience) || startingSalary <= 0 || experience <= 0) {
    resultBox.innerText = "Please enter valid salary and experience.";
    resultBox.style.color = "red";
    return;
  }

  var currentSalary = startingSalary;
  for (var i = 1; i <= experience; i++) {
    currentSalary = currentSalary + (currentSalary * 0.05);
  }

  resultBox.style.color = "green";
  resultBox.innerText = "Current Salary: " + currentSalary.toFixed(2) + " BDT";
}
