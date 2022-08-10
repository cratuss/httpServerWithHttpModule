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
  {
    id: 3,
    name: "warrent Predovic",
    email: "warrent@gmail.com",
    password: "password",
  },
  {
    id: 4,
    name: "ldoh92 Predovic",
    email: "ldoh92@gmail.com",
    password: "password",
  },
];

//게시물 데이터 - 1
const posts = [
  {
    postingId: 1,
    postingTitle: "간단한 HTTP API 개발 시작!",
    postingContent: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    postingId: 2,
    postingTitle: "HTTP의 특성",
    postingContent: "Request/Response와 Stateless!!",
    userId: 1,
  },
  {
    postingId: 3,
    postingTitle: "내용 1",
    postingContent: "sampleContent3",
    userId: 3,
  },
  {
    postingId: 4,
    postingTitle: "내용 2",
    postingContent: "sampleContent4",
    userId: 4,
  },
];

// 아래에 코드를 작성해 주세요.

//회원가입 구현
const addUser = (req, res) => {
  const { name, email, password } = req.body.data;
  if (users.length === 0) {
    users.push({ id: 1, name, email, password });
  } else {
    users.push({ id: users.length + 1, name, email, password });
  }

  res.status(201).json({ message: "userCreated" });
};

//게시글 생성 구현
const addPost = (req, res) => {
  const { postingTitle, postingContent, userId } = req.body.data;

  if (posts.length === 0) {
    posts.push({ postingId: 1, postingTitle, postingContent, userId });
  } else {
    posts.push({ postingId: posts.length + 1, postingTitle, postingContent, userId });
  }

  res.status(201).json({ message: "postCreated" });
};

//게시글 목록 출력
const postList = (req, res) => {
  let newPosts = posts.map((post) => {
    const user = users.find((user) => post.userId === user.id);
    return {
      ...post,
      userName: user.name,
    };
  });

  res.status(200).json({ data: newPosts });
};

//게시글 수정
const editPost = (req, res) => {
  const { id, content } = req.body.data;

  posts.some((post) => {
    if (post.postingId === Number(id)) {
      const user = users.find((user) => user.id === post.userId);
      post.postingContent = content;
      post.userName = user.name;
      res.status(201).json({ data: post });
      return true;
    }
    return false;
  });
};

//게시글 삭제
const deletePost = (req, res) => {
  const { id } = req.body.data;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].postingId === Number(id)) {
      posts.splice(i, 1);
      break;
    }
  }
  console.log(posts);
  res.status(201).json({ message: "postingDeleted" });
};

//해당 유저 게시글 확인
const userPosting = (req, res) => {
  const { id } = req.params;

  const postings = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].userId === Number(id)) {
      const { userId, ...rest } = posts[i];
      postings.push({
        ...rest,
      });
    }
  }

  const user = users.find((user) => user.id === Number(id));

  const newUserPosting = {
    userID: user.id,
    userName: user.name,
    postings,
  };

  res.status(200);
  res.json({ data: newUserPosting });
};

module.exports = { addUser, addPost, postList, editPost, deletePost, userPosting };
