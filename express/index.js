import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hi Haider Gill First Page");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

app.get("/contact", (req, res) => {
  res.send("This is Contact Page");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
