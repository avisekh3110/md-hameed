const chalk = require("chalk");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

let allData = [];

const adminKey = "UUO2ZQPTOKTQ33DU";

const app = express();
const PORT = process.env.PORT || 8080;
const ISDEV = process.env.NODE_ENV !== "production";

app.use(cors());

app.use("/", express.static("public"));

app.get("/allData", (req, res) => {
  if (req.query.adminkey === adminKey) {
    res.send(allData);
  } else {
    res.send("Chal Bhagle yaha se. :P");
  }
});

app.get("/throwError", (req, res) => {
  throw new Error("This is an intentional Error! :D");
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
    if (password === adminKey) {
      soc.emit("gotAllData", allData);
      console.log("Sending data");
    }
  });
  soc.on("cls", (password) => {
    if (password === adminKey) {
      allData = [];
    }
  });
});

function errorHandler(err, req, res, next) {
  console.error(`Err:  ${chalk.redBright(err.message)} \nstack: ${err.stack}`);
  res.send({
    msg: ISDEV ? err.message : "There was some internal server Error D:",
    stack: ISDEV
      ? err.stack
      : "Can not show error stacks on production build, Contact developer for help",
  });
}

app.use(errorHandler);
