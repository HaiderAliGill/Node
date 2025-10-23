import chalk from "chalk";
import readline from "readline/promises";
import fetch from "node-fetch"; // ✅ Needed for fetch in Node.js (if Node < 18)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_KEY = "a004aed9e30a08b94885b7500b2776fe";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const getCityWeather = async (city) => {
  const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(chalk.blueBright(`\nWeather in ${data.name}, ${data.sys.country}`));
    console.log(chalk.yellow(`Temperature: ${data.main.temp}°C`));
    console.log(chalk.green(`Wind Speed: ${data.wind.speed} m/s`));
    console.log(chalk.cyan(`Description: ${data.weather[0].description}`));
  } catch (error) {
    console.log(chalk.red(`Error: ${error.message}`));
  }
};

const city = await rl.question("Enter City name: ");
await getCityWeather(city);

rl.close();


// https.get(API_URL, (response) => {
//     response.on("data", (chunk) => {
//         data += chunk;
//     });
//     response.on("end", () => {
//         try {
//             const weatherData = JSON.parse(data).hourly.temperature_2m;
//             rl.question(
//                 chalk.blue("Enter the hour (0-23) to get the temperature: "),
//                 (hour) => {
//                     const hourNum = parseInt(hour);
//                     if (isNaN(hourNum) || hourNum < 0 || hourNum > 23) {
//                         console.log(chalk.red("❌ Please enter a valid hour between 0 and 23!"));
//                         rl.close();
//                         return;
//                     }
//                     const temperature = weatherData[hourNum];
//                     console.log(
//                         chalk.green(`The temperature at hour ${hourNum} is ${temperature}°C`)
//                     );
//                     rl.close();
//                 }
//             );
//         } catch (error) {
//             console.log(chalk.red("❌ Error parsing weather data!"));
//             rl.close();
//         }
//     });
// }).on("error", (err) => {
//     console.log(chalk.red("❌ Error fetching weather data: " + err.message));
//     rl.close();
// });
