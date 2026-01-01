import express from "express";
import { PORT } from "./evn.js";

const app = express();

// 🔥 static files serve karne ke liye
app.use(express.static("public"));

app.get("/profile/:username/article/:slug", (req, res) => {
  console.log(req.params)
  const remodash = req.params.slug.replace(/-/g, " ");
  res.send(`This is Articale Page of ${req.params.username} with slug ${remodash}`);
});

app.get("/contact", (req, res) => {
  res.send("This is Contact Page");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
