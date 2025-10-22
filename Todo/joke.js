import https from "https";
import chalk from "chalk";

console.log(chalk.green("✅ joke.js is running successfully!\n"));

const jock = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const joke = JSON.parse(data);

        console.log(chalk.yellow("🎭 Here's a random joke for you:\n"));
        console.log(chalk.red(joke.setup));
        console.log(chalk.blue.bgRed.bold(joke.punchline));
        console.log(chalk.green(`Type: ${joke.type}\n`));
      } catch (err) {
        console.error(chalk.red("Failed to parse joke data."), err.message);
      }
    });

    response.on("error", (err) => {
      console.error(chalk.red(`Error: ${err.message}`));
    });
  });
};

jock();