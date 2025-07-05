// js/main.js

const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const feedPosts = document.getElementById("feedPosts");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
  feedPosts.innerHTML = "";
  posts.reverse().forEach((post, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
    feedPosts.appendChild(div);
  });
  posts.reverse();
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newPost = {
    title: postTitle.value,
    content: postContent.value,
  };
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  postForm.reset();
  renderPosts();
});

renderPosts();

let pollVotes = JSON.parse(localStorage.getItem("pollVotes")) || {
  yes: 0,
  no: 0,
};

function vote(choice) {
  pollVotes[choice]++;
  localStorage.setItem("pollVotes", JSON.stringify(pollVotes));
  showPollResults();
}

function showPollResults() {
  const total = pollVotes.yes + pollVotes.no;
  const result = document.getElementById("pollResult");
  result.innerHTML = `
    <strong>Yes:</strong> ${pollVotes.yes} votes<br>
    <strong>No:</strong> ${pollVotes.no} votes<br>
    <em>Total votes:</em> ${total}
  `;
}

showPollResults();