const socket = io("localhost:8080");

const btn = document.getElementById("loginbtn");

const username = document.getElementById("username");
const password = document.getElementById("password");

btn.onclick = () => {
  const data = {
    name: username.value,
    pass: password.value,
  };
  socket.emit("newData", data);
  console.log(data);
};
