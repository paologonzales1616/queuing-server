require("dotenv").config();
const port = parseInt(process.env.PORT, 10) || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require("express")();

let windows = [];

express.use(cors());
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));
express.use(logger("dev"));

// Add new window
express.post("/windows", async (req, res) => {
  const { counter } = req.body;
  windows.push({ counter: counter, status: false, number: 0 });
  res.json({
    message: "success"
  });
});

// Update serving
express.put("/windows", async (req, res) => {
  const { index, counter, status, number } = req.body;

  windows[index].counter = counter;
  windows[index].status = status;
  windows[index].number = number;

  res.json({
    message: "success"
  });
});

express.delete("/windows", async (req, res) => {
  const { index } = req.body;
  windows.splice(index, 1);
  res.json({
    message: "success"
  });
});

// Get current window
express.get("/windows", async (req, res) => {
  res.json({
    windows: windows
  });
});

express.listen(port, () =>
  console.log(`Server server running on host: http://localhost:${port}`)
);
