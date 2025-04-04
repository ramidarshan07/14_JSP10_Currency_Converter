const amountInput = document.querySelector("#amount");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const swap = document.querySelector("#swap");
const convert = document.querySelector("#convert");
const result = document.querySelector("#result");

const apiKey = "518808c5063987f6ee79432e";
const currencyApi = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

async function loadCurrency() {
    try {
        const response = await fetch(currencyApi + "USD");
        const data = await response.json();

        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach((currency) => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.text = option2.text = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "INR";

    } catch (error) {
        console.error("Failed to load currencies:", error);
        result.innerHTML = "Unable to load currency data.";
        result.style.color = "red";
    }
}

async function convertedCurrency() {
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        result.innerHTML = "Enter a valid amount";
        result.style.color = "red";
        return;
    }

    try {
        const res = await fetch(currencyApi + fromCurrency.value);
        const data = await res.json();
        const rate = data.conversion_rates[toCurrency.value];
        const convertedAmount = (amount * rate).toFixed(2);
        result.style.color = "green";
        result.innerHTML = `${amount} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
    } catch (error) {
        console.error("Conversion failed:", error);
        result.innerHTML = "Conversion failed. Try again later.";
        result.style.color = "red";
    }
}

swap?.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

convert.addEventListener("click", convertedCurrency);
document.addEventListener("DOMContentLoaded", loadCurrency);
