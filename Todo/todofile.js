import readline from "readline";
import fs from "fs";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const folderpath = "./";

const makefile = () => {
  console.log("1: add old file data");
  console.log("2: add new file ");
  rl.question("want to make File ", (number) => {
    if (parseInt(number) === 1) {
      // Show all .txt files
      fs.readdir(folderpath, (err, files) => {
        if (err) {
          console.error("Unable to read the directory:", err);
          rl.close();
          return;
        }

        const txtFiles = files.filter(
          (file) => path.extname(file).toLowerCase() === ".txt"
        );

        if (txtFiles.length === 0) {
          console.log("No .txt files found.");
          rl.close();
          return;
        }

        console.log("Available .txt files:");
        txtFiles.forEach((file, index) => {
          console.log(`${index + 1}: ${file}`);
        });

        rl.question("Select a file by number: ", (fileIndex) => {
          const selectedIndex = parseInt(fileIndex) - 1;
          const selectedFile = txtFiles[selectedIndex];

          if (!selectedFile) {
            console.log("Invalid selection.");
            rl.close();
            return;
          }

          const filePath = path.join(folderpath, selectedFile);

          // Read and show existing content
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              rl.close();
              return;
            }

            console.log(`\nCurrent content of ${selectedFile}:\n`);
            console.log(data || "(File is empty)");

            rl.question("\nEnter new item to add: ", (newItem) => {
              const updatedContent =
                data +
                (data && !data.endsWith("\n") ? "\n" : "") +
                newItem +
                "\n";

              fs.writeFile(filePath, updatedContent, (err) => {
                if (err) {
                  console.error("Error writing to file:", err);
                } else {
                  console.log("Item added successfully.");
                }
                rl.close();
              });
            });
          });
        });
      });
    } else {

      rl.question("Enter File name" ,(filename)=>{
        


      } )

      rl.writeFile()
    }
  });
};

makefile();
