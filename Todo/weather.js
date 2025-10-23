import chalk from "chalk";
import https from "https";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API_URL_key ="a004aed9e30a08b94885b7500b2776fe"
const API_URL_two ="https://api.openweathermap.org/data/2.5/weather";
const API_URL ="https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m";
let data = "";

https.get(API_URL, (response) => {
    response.on("data", (chunk) => {
        data += chunk;
    });
    response.on("end", () => {
        try {
            const weatherData = JSON.parse(data).hourly.temperature_2m;
            rl.question(
                chalk.blue("Enter the hour (0-23) to get the temperature: "),
                (hour) => {
                    const hourNum = parseInt(hour);
                    if (isNaN(hourNum) || hourNum < 0 || hourNum > 23) {
                        console.log(chalk.red("❌ Please enter a valid hour between 0 and 23!"));
                        rl.close();
                        return;
                    }
                    const temperature = weatherData[hourNum];
                    console.log(
                        chalk.green(`The temperature at hour ${hourNum} is ${temperature}°C`)
                    );
                    rl.close();
                }
            );
        } catch (error) {
            console.log(chalk.red("❌ Error parsing weather data!"));
            rl.close();
        }
    });
}).on("error", (err) => {
    console.log(chalk.red("❌ Error fetching weather data: " + err.message));
    rl.close();
});