const express = require('express');
const accountsRoutes = require("./routes/accountRoutes");

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ message: "gooodd!" });
  });
  server.use("/accounts", accountRoutes);

module.exports = server;