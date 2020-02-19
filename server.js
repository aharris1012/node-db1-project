const express = require('express');
const accountRoutes = require("./routes/accountRoutes");

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ message: "gooodd!" });
  });
  
  server.use("/api/accounts", accountRoutes);

module.exports = server;