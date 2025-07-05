// Poll CRUD with Creator Details + Feed Post Section

// ===== Feed Post Logic =====
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const feedPosts = document.getElementById("feedPosts");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
  if (!feedPosts) return;
  feedPosts.innerHTML = "";
  posts
    .slice()
    .reverse()
    .forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
      feedPosts.appendChild(div);
    });
}

if (postForm) {
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
}

// ===== Poll CRUD Section =====
let polls = JSON.parse(localStorage.getItem("polls")) || [];

function renderPolls() {
  const pollList = document.getElementById("pollList");
  if (!pollList) return;
  pollList.innerHTML = "";
  polls.forEach((poll, index) => {
    const div = document.createElement("div");
    div.classList.add("poll-card");
    div.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
        <img src="${poll.dp}" alt="${poll.name}" style="width: 40px; height: 40px; border-radius: 50%;">
        <strong>${poll.name}</strong>
      </div>
      <p><strong>Q:</strong> ${poll.question}</p>
      <p>
        <button onclick="votePoll(${index}, 'yes')">Yes</button>
        <button onclick="votePoll(${index}, 'no')">No</button>
      </p>
      <p>✅ Yes: ${poll.votes.yes} | ❌ No: ${poll.votes.no}</p>
      <p>
        <button onclick="editPoll(${index})">Edit</button>
        <button onclick="deletePoll(${index})">Delete</button>
      </p>
      <br>
      <hr>
      <br>
    `;
    pollList.appendChild(div);
  });
}

function votePoll(index, choice) {
  polls[index].votes[choice]++;
  savePolls();
}

function editPoll(index) {
  const newQuestion = prompt("Edit Poll Question:", polls[index].question);
  if (newQuestion !== null && newQuestion.trim() !== "") {
    polls[index].question = newQuestion.trim();
    savePolls();
  }
}

function deletePoll(index) {
  if (confirm("Are you sure you want to delete this poll?")) {
    polls.splice(index, 1);
    savePolls();
  }
}

function savePolls() {
  localStorage.setItem("polls", JSON.stringify(polls));
  renderPolls();
}

const pollForm = document.getElementById("pollForm");
if (pollForm) {
  pollForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("creatorName").value.trim();
    const dpInput = document.getElementById("creatorDp");
    const file = dpInput.files[0];

    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const dp = e.target.result; // Base64 image string

      const newPoll = {
        name,
        dp,
        question,
        votes: { yes: 0, no: 0 },
      };

      polls.push(newPoll);
      savePolls();
      pollForm.reset();
    };

    reader.readAsDataURL(file);

    const question = document.getElementById("pollQuestion").value.trim();

    if (!name || !dp || !question) return;

    const newPoll = {
      name,
      dp,
      question,
      votes: { yes: 0, no: 0 },
    };
    polls.push(newPoll);
    savePolls();
    pollForm.reset();
  });
  renderPolls();
}
const fileInput = document.getElementById("creatorDp");
const fileNameDisplay = document.getElementById("fileName");

fileInput.addEventListener("change", function () {
  fileNameDisplay.textContent =
    fileInput.files.length > 0 ? fileInput.files[0].name : "No file selected";
});

// ===== Club Section with Image Upload =====
let clubs = JSON.parse(localStorage.getItem("clubs")) || [];

function renderClubs() {
  const clubList = document.getElementById("clubList");
  if (!clubList) return;
  clubList.innerHTML = "";

  clubs.forEach((club) => {
    const div = document.createElement("div");
    div.classList.add("club-card");
    div.innerHTML = `
      <img src="${club.logo}" alt="${club.name} Logo" />
      <h4>${club.name}</h4>
      <p>${club.desc}</p>
    `;
    clubList.appendChild(div);
  });
}

const clubForm = document.getElementById("clubForm");
if (clubForm) {
  clubForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clubName").value.trim();
    const desc = document.getElementById("clubDesc").value.trim();
    const logoInput = document.getElementById("clubLogo");
    const file = logoInput.files[0];

    if (!name || !desc || !file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const logo = e.target.result;

      const newClub = { name, desc, logo };
      clubs.push(newClub);
      localStorage.setItem("clubs", JSON.stringify(clubs));
      clubForm.reset();
      renderClubs();
    };
    reader.readAsDataURL(file);
  });

  renderClubs();
}


// ===== Marketplace Section with Image Upload =====
let items = JSON.parse(localStorage.getItem("marketplaceItems")) || [];

function renderItems() {
  const itemList = document.getElementById("itemList");
  if (!itemList) return;
  itemList.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item-card");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p><strong>Price:</strong> ₹${item.price}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
    `;
    itemList.appendChild(div);
  });
}

const itemForm = document.getElementById("itemForm");
if (itemForm) {
  itemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("itemName").value.trim();
    const price = document.getElementById("itemPrice").value.trim();
    const contact = document.getElementById("contactInfo").value.trim();
    const imageInput = document.getElementById("itemImage");
    const file = imageInput.files[0];

    if (!name || !price || !contact || !file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const image = e.target.result;

      const newItem = { name, price, contact, image };
      items.push(newItem);
      localStorage.setItem("marketplaceItems", JSON.stringify(items));
      itemForm.reset();
      renderItems();
    };
    reader.readAsDataURL(file);
  });

  renderItems();
}
