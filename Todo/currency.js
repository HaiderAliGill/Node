import https from "https";
import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_URL =
  "https://v6.exchangerate-api.com/v6/b48c6f412b581fa253900a33/latest/USD";

let data = "";

https.get(API_URL, (response) => {
  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    try {
      const exchangeData = JSON.parse(data).conversion_rates;

      rl.question(
        chalk.blue("Enter the amount in USD you want to convert: "),
        (amount) => {
          const amountNum = parseFloat(amount);
          if (isNaN(amountNum)) {
            console.log(chalk.red("❌ Please enter a valid number!"));
            rl.close();
            return;
          }

          rl.question(
            chalk.blue(
              "Enter the currency code you want to convert to (e.g., EUR, GBP, JPY): "
            ),
            (currencyCode) => {
              const rate = exchangeData[currencyCode.toUpperCase()];

              if (rate) {
                console.log(
                  chalk.green(`1 USD = ${rate} ${currencyCode.toUpperCase()}`)
                );
                const converted = amountNum * rate;
                console.log(
                  chalk.yellow(
                    `${amountNum} USD = ${converted.toFixed(
                      2
                    )} ${currencyCode.toUpperCase()}`
                  )
                );
              } else {
                console.log(
                  chalk.red("❌ Invalid currency code! Please try again.")
                );
              }

              rl.close();
            }
          );
        }
      );
    } catch (error) {
      console.error(
        chalk.red("Failed to parse exchange rate data."),
        error.message
      );
      rl.close();
    }
  });

  response.on("error", (err) => {
    console.error(chalk.red(`Error: ${err.message}`));
  });
});
