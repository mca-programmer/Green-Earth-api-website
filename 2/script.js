function checkGift() {
  const money = parseInt(document.getElementById("money").value);
  const result = document.getElementById("result");

  if (isNaN(money)) {
    result.innerText = "❌ Please enter a valid amount.";
    return;
  }

  if (money >= 25000) {
    result.innerText = "🎉 Montu will get a Laptop 💻";
  } else if (money >= 10000) {
    result.innerText = "🚲 Montu will get a Cycle";
  } else {
    result.innerText = "🍫 Montu will get Chocolate as a consolation prize.";
  }
}
