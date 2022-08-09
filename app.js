// app.js

const users = [];

const posts = [];

// 아래에 코드를 작성해 주세요.
const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  // const user = req.body.data;

  users.push({
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  });

  users.push({
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  });

  console.log(users);
  res.json({ message: "userCreated" });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is running on PORT 8000");
});
