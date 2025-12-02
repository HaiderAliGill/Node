import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// Get correct absolute paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3001;

const server = createServer(async (req, res) => {

  if (req.method === "GET" && req.url === "/shorturl") {

    try {

      // ✅ Build the correct absolute path

      const filePath = path.join(__dirname, "public", "index.html");

      console.log("📄 Serving file from:", filePath);

      const data = await readFile(filePath);

      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(data);

    } catch (error) {

      console.error("❌ File Read Error:", error);

      res.writeHead(404, { "Content-Type": "text/html" });

      res.end("404 Not Found");

    }
  } else {
    
    res.writeHead(404, { "Content-Type": "text/html" });

    res.end("404 Not Found");

  }
});

server.listen(port, () => {

  console.log(`✅ Server running at http://localhost:${port}/shorturl`);

});
