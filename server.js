const http = require("http");
const express = require("express");
const { addUser, addPost, postList, editPost, deletePost } = require("./app.js");

const app = express();
app.use(express.json());

//회원가입
app.post("/signup", addUser);

//게시글 생성
app.post("/addpost", addPost);

//게시글 생성
app.get("/postlist", postList);

//게시글 수정
app.patch("/editpost", editPost);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is running on PORT 8000");
});
