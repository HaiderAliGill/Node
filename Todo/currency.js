import https from "https";
import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Your API Key: b48c6f412b581fa253900a33
// Example Request: https://v6.exchangerate-api.com/v6/b48c6f412b581fa253900a33/latest/USD
let data = "";

https.get(
  "https://v6.exchangerate-api.com/v6/b48c6f412b581fa253900a33/latest/USD",
  (response) => {
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const exchangeData = JSON.parse(data).conversion_rates;
        console.log(exchangeData);

        rl.question(
          chalk.blue("Enter the amount in USD you want to convert: "),
          (amount) => {
            console.log(chalk.green(`You entered: ${amount} USD`));

            rl.question(
              chalk.blue(
                "Enter the currency code you want to convert to (e.g., EUR, GBP, JPY): "
              ),
              (currencyCode) => {
                const rate = exchangeData[currencyCode.toUpperCase()];
                if (rate) {
                  console.log(
                    chalk.green(
                      `1 USD is equal to ${rate} ${currencyCode.toUpperCase()}`
                    )
                  );
                  let convertedAmount = amount * rate;
                  console.log(
                    chalk.yellow(
                      `${amount} USD is equal to ${convertedAmount.toFixed(
                        2
                      )} ${currencyCode.toUpperCase()}`
                    )
                  );
                }
              }
            );
          }
        );
      } catch (error) {
        console.error(
          chalk.red("Failed to parse exchange rate data."),
          error.message
        );
      }
    });
  }
);
