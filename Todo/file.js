import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writefilecreate = () => {
  rl.question("Enetr File Name ", (Filename) => {
    rl.question("File Content Enter ", (content) => {
      fs.writeFile(`${Filename}.txt`, content, (err) => {
        if (err) {
          console.log(`${err.message}`);
        } else {
          console.log(` file is created ${Filename}.txt`);
        }
        rl.close();
      });
    });
  });
};

writefilecreate();
