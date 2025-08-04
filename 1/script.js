function divideAsset() {
  const area = parseFloat(document.getElementById("area").value);
  const output = document.getElementById("output");

  if (isNaN(area) || area <= 0 || area > 1e9) {
    output.innerText = "❌ Please enter a valid number (0 < number ≤ 109)";
    return;
  }

  const eachShare = area / 2;
  output.innerText = `Rahim gets: ${eachShare}\nKarim gets: ${eachShare}`;
}
