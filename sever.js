const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // public 파일 연결
let lists = [];
//포트 8000번 서버 시작
app.listen(8080, () => {
  console.log("open");
});

// 홈
app.get("/", (req, res) => {
  res.render("main", { lists });
});

// 리스트 추가
app.post("/add_list", (req, res) => {
  const newContent = req.body.content;
  console.log(newContent);
  const newnewContent = lists.push(newContent);

  res.redirect("/");
});

//리스트 삭제
app.get("/delete/:id", (req, res) => {
  const deleteContent = req.params.id;
  lists = lists.filter((value) => value !== deleteContent);
  res.redirect("/");
});

//리스트 전체 삭제
app.get("/all_delete", (req, res) => {
  lists = [];
  res.redirect("/");
});

//리스트 수정
app.get("/open_update/:id", (req, res) => {
  res.render("update", { prevContent: req.params.id });
});

app.post("/update", (req, res) => {
  let prevContent = req.body.prevContent;
  let newContent = req.body.newContent;
  let index = lists.indexOf(prevContent);
  lists.splice(index, 1, newContent);
  res.redirect("/");
});
