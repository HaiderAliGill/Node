import https from "https";
import chalk from "chalk";
console.log("✅ joke.js is running successfully!");

const jock = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";

  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", (end_data) => {
      const joke = JSON.parse(data);
      console.log(`Joke:`);
      console.log(`chalk.red(${joke.setup})  Joke:`);
      console.log(`chalk.blue.bgRed.bold(${joke.punchline}):`);
      console.log(`chalk.blue.bgRed.bold(${joke.type}):`);
      console.log(joke);
    });

    response.on("error", (err) => {
      console.log(`Error is : ${err.message}`);
    });
  });
};
jock()