// app.js
const http = require("http");
const express = require("express");

//데이터베이스
const users = [];
const posts = [];

//이 데이터들이 json형태로 프론트에서 들어왔다 가정 - 시작
let frontUserData = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];
frontUserData = JSON.stringify(frontUserData);

let frontPostData = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];
frontPostData = JSON.stringify(frontPostData);
//끝

// 아래에 코드를 작성해 주세요.
const app = express();
app.use(express.json());

//회원가입 구현
const addUser = (req, res) => {
  req.body = frontUserData;
  const user = JSON.parse(req.body);

  user.forEach((element) => {
    users.push({
      id: element.id,
      name: element.name,
      email: element.email,
      password: element.password,
    });
  });
  console.log(users);

  res.json({ message: "userCreated" });
};

//게시글 생성 구현
const addPost = (req, res) => {
  req.body = frontPostData;
  const post = JSON.parse(req.body);

  post.forEach((element) => {
    posts.push({
      id: element.id,
      title: element.title,
      content: element.content,
      userId: element.userId,
    });
  });

  console.log(posts);

  res.json({ message: "postCreated" });
};

//회원가입
app.post("/signup", addUser);

//게시글 생성
app.post("/addpost", addPost);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is running on PORT 8000");
});
