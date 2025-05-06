import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const list = [];

function showfuncion() {
  console.log("1. Add");
  console.log("2. Show List");
  console.log("3. Exit");

  rl.question("Enter A Number: ", (input) => {
    if (parseInt(input) === 1) {
      rl.question("Enter the task name", (data) => {
        list.push(data);
        showfuncion();
      });
    } else if (parseInt(input) === 2) {
      console.log("Your To Do List");

      if (list.length === 0) {
        console.log("Empaty");
      } else {
        list.forEach((item, index) => {
          console.log(` ${index + 1} ${item}`);
        });
      }
      showfuncion();
    } else if (parseInt(input) === 3) {
      console.log("GoodBy");
      rl.close();
    } else {
      console.log("Invalid Input");
      showfuncion();
    }
  });
}

showfuncion();
