const countriesCodes = document.querySelectorAll("select");
let thefrom;
let theto;

const convertCurrency = (amount, from, to) => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=2`)
    .then((res) => res.json())

    .then((data) => (document.getElementById("to").value = data.result))

    .catch((err) => {
      document.getElementById("to").value = "Error";
      console.log(err);
    });
};

const listCodes = () => {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then((res) => res.json())

    .then((data) => {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          countriesCodes.forEach(
            (countrieCode) => (countrieCode.innerHTML += `<option>${key.toUpperCase()}</option>`),
          );
        }
      }
    })

    .catch((err) => {
      to.value = "Error";
      console.log(err);
    });
};

window.addEventListener("load", listCodes);

countriesCodesFrom.addEventListener("change", (e) => (thefrom = e.target.value));

countriesCodesTo.addEventListener("change", (e) => (theto = e.target.value));

from.addEventListener("input", (e) => {
  if (e.target.value === "") {
    to.value = "";
  } else if (thefrom && theto) {
    convertCurrency(e.target.value, thefrom, theto);
  }
});
