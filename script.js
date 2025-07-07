const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

async function populateCurrencies() {
  const res = await fetch(apiURL);
  const data = await res.json();

  const currencyCodes = Object.keys(data.rates);
  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");

  currencyCodes.forEach(code => {
    const option1 = new Option(code, code);
    const option2 = new Option(code, code);
    fromSelect.add(option1);
    toSelect.add(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "INR";
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;

  if (!amount) return alert("Please enter an amount");

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await res.json();

  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);

  document.getElementById("result").innerText =
    `${amount} ${from} = ${converted} ${to}`;
}

populateCurrencies();
