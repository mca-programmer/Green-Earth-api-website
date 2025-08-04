function generatePlan() {
  const lastDay = parseInt(document.getElementById("lastDay").value);
  const outputDiv = document.getElementById("output");

  if (isNaN(lastDay) || lastDay <= 2 || lastDay > 30) {
    outputDiv.innerText = "⚠️ Please enter a number between 3 and 30.";
    return;
  }

  let result = `${lastDay}\n`;
  for (let day = 1; day <= lastDay; day++) {
    if (day % 3 === 0) {
      result += `${day} - medicine\n`;
    } else {
      result += `${day} - rest\n`;
    }
  }

  outputDiv.innerText = result;
}
