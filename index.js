const chalk = require("chalk");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

let allData = [];

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use("/", express.static("public"));

app.get("/allData", (req, res) => {
  res.send(allData);
});

let server = app.listen(PORT, () => {
  console.clear();
  console.log(
    chalk.cyanBright(`Server started on PORT ${chalk.bold(PORT)} at ${Date()}`)
  );
});

let io = socket(server);

io.sockets.on("connection", (soc) => {
  console.log(soc.id);
  soc.on("newData", (data) => {
    allData.push({ ...data, date: Date() });
    console.log(allData);
  });
  soc.on("getAllData", (password) => {
    if (password === "UUO2ZQPTOKTQ33DU") {
      soc.emit("gotAllData", allData);
      console.log("Sending data");
    }
  });
  soc.on("cls", (password) => {
    if (password === "UUO2ZQPTOKTQ33DU") {
      allData = [];
    }
  });
});
