// app.js

//유저 데이터
const users = [
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

//게시물 데이터 - 1
const posts = [
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

//게시글 목록 데이터 - 2
const list = {
  data: [
    {
      userID: 1,
      userName: "Rebekah Johnson",
      postingId: 1,
      postingTitle: "간단한 HTTP API 개발 시작!",
      postingContent: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    },
    {
      userID: 2,
      userName: "Fabian Predovic",
      postingId: 2,
      postingTitle: "HTTP의 특성",
      postingContent: "Request/Response와 Stateless!!",
    },
    {
      userID: 3,
      userName: "new user 1",
      postingId: 3,
      postingTitle: "내용 1",
      postingContent: "sampleContent3",
    },
    {
      userID: 1,
      userName: "new user 2",
      postingId: 4,
      postingTitle: "내용 2",
      postingContent: "sampleContent4",
    },
  ],
};

// 아래에 코드를 작성해 주세요.

//회원가입 구현
const addUser = (req, res) => {
  const { id, name, email, password } = req.body.userinfo;

  users.push({ id, name, email, password });

  console.log(users);
  res.status(201);
  res.json({ message: "userCreated" });
};

//게시글 생성 구현
const addPost = (req, res) => {
  const { id, title, content, userId } = req.body.postinfo;

  posts.push({ id, title, content, userId });

  console.log(posts);
  res.status(201);
  res.json({ message: "postCreated" });
};

//게시글 목록 출력
const postList = (req, res) => {
  res.status(200);
  res.json(list);
};

//게시글 수정
const editPost = (req, res) => {
  const { postingId } = req.params;
  const { userId, userName, postingTitle, postingContent } = req.body.data;

  const resEdit = {};

  list.data.some((element) => {
    if (element.postingId === Number(postingId)) {
      element.userID = userId;
      element.userName = userName;
      element.postingTitle = postingTitle;
      element.postingContent = postingContent;
      resEdit.data = element;
      return true;
    }
    return false;
  });

  res.status(201);
  res.json(resEdit);
};

//게시글 삭제
const deletePost = (req, res) => {
  const { postingId } = req.params;
  for (let i = 0; i < list.data.length; i++) {
    if (list.data[i].postingId === Number(postingId)) {
      list.data.splice(i, 1);
      break;
    }
  }
  console.log(list.data);
  res.status(201);
  res.json({ message: "postingDeleted" });
};

const userPosting = (req, res) => {
  const { userId } = req.params;

  const resUserList = {};
  resUserList.data = {};

  users.some((element) => {
    if (element.id === Number(userId)) {
      resUserList.data.userID = element.id;
      resUserList.data.userName = element.name;
      return true;
    }
  });

  resUserList.data.postings = [];
  list.data.forEach((element) => {
    if (element.userID === Number(userId)) {
      resUserList.data.postings.push({
        postingId: element.postingId,
        postingTitle: element.postingTitle,
        postingContent: element.postingContent,
      });
    }
  });

  res.status(200);
  res.json(resUserList);
};

module.exports = { addUser, addPost, postList, editPost, deletePost, userPosting };
