require("dotenv").config();
const port = parseInt(process.env.PORT, 10) || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require("express");
const server = express();
const path = require("path");

let windows = [];
let server_banner = "";
let server_youtube_link = "";

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger("dev"));

server.post("/windows/banner", async (req, res) => {
  const { banner } = req.body;
  console.log(banner);
  server_banner = banner;
  res.json({
    message: "success"
  });
});

server.get("/windows/banner", async (req, res) => {
  return res.json({ banner: server_banner });
});

server.get("/windows/youtube_link", async (req, res) => {
  return res.json({ youtube_link: server_youtube_link });
});

server.post("/windows/youtube_link", async (req, res) => {
  const { youtube_link } = req.body;
  server_youtube_link = youtube_link;
  res.json({
    message: "success"
  });
});

// Add new window
server.post("/windows", async (req, res) => {
  const { counter } = req.body;
  windows.push({ counter: counter, status: false, number: 0 });
  res.json({
    message: "success"
  });
});

// Update serving
server.put("/windows", async (req, res) => {
  const { index, counter, status, number } = req.body;

  windows[index].counter = counter;
  windows[index].status = status;
  windows[index].number = number;

  res.json({
    message: "success"
  });
});

server.delete("/windows", async (req, res) => {
  const { index } = req.body;
  windows.splice(index, 1);
  res.json({
    message: "success"
  });
});

// Get current window
server.get("/windows", async (req, res) => {
  res.json({
    windows: windows
  });
});

// Serve the static files from the React app
server.use(express.static(path.join(__dirname, "client/queuing/build")));

// Handles any requests that don't match the ones above
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/queuing/build/index.html"));
});

server.listen(port, () =>
  console.log(`Server server running on host: http://localhost:${port}`)
);
