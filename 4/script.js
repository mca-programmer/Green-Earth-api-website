function checkFile() {
  var fileName = document.getElementById("fileNameInput").value;
  var result = document.getElementById("result");

  if (
    fileName.startsWith("#") ||
    fileName.endsWith(".pdf") ||
    fileName.endsWith(".docx")
  ) {
    result.innerText = "Store";
    result.style.color = "green";
  } else {
    result.innerText = "Delete";
    result.style.color = "red";
  }
}
