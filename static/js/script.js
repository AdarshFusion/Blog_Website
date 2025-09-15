// Dark mode toggle
const darkModeBtn = document.getElementById("darkModeBtn");

// ✅ Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️";
} else {
  darkModeBtn.textContent = "🌙";
}

// ✅ Toggle and save
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkModeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    darkModeBtn.textContent = "🌙";
  }
});

// Back to top + reading progress
const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  // Back to top
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.display = "block";
  } else backToTop.style.display = "none";
  // Reading progress
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("readingProgress").style.width = (winScroll / height) * 100 + "%";
};
backToTop.addEventListener("click", () => { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; });

// Hero animated text
const heroText = document.getElementById("heroText");
const heroPhrases = ["Discover Trending Stories", "Explore Creative Ideas", "Read Inspiring Articles"];
let heroIndex = 0;
function typeHero() {
  heroText.textContent = "";
  let phrase = heroPhrases[heroIndex];
  let i = 0;
  let interval = setInterval(() => {
    heroText.textContent += phrase[i];
    i++;
    if (i >= phrase.length) {
      clearInterval(interval);
      setTimeout(() => { heroIndex = (heroIndex + 1) % heroPhrases.length; typeHero(); }, 1000);
    }
  }, 100);
}
typeHero();




// Top authors
let topAuthorBlogs = JSON.parse(document.getElementById("top-author-data").textContent);
let grid = document.getElementById("topAuthorGrid");

if (!topAuthorBlogs || topAuthorBlogs.length === 0) {
  grid.innerHTML = "<p>No top author blogs found.</p>";
} else {
  topAuthorBlogs.forEach(item => {
    let card = document.createElement("div");
    card.className = "col-md-3 col-6 mb-3"; // 2 per row
    card.innerHTML =
      `<div class="card h-100 author-card text-center bg-light text-dark p-2">
    <img src="/media/${item.blog_image}" class="card-img-top mx-auto mt-3">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.short_description.substring(0, 100)}...</p>
    </div></div>`;
    grid.appendChild(card);
  });
}



// Categories}
let categories = JSON.parse(document.getElementById("categories-data").textContent);
let categoryList = document.getElementById("categoryList");
categories.forEach(c => {
  let span = document.createElement("span");
  span.className = "badge bg-transparent border border-secondary rounded me-2 p-2";
  span.innerHTML = `<a href="/category-blog/${c}">${c}</a>`;
  // a.textContent = c;
  categoryList.appendChild(span);
});


// Newsletter submit
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Subscribed!");
});

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

// Signup Form
const signupForm = document.getElementById("signupForm");
signupForm && signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    alert("User already exists! Please login.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! You can now login.");
  document.getElementById("signupForm").reset();
  const loginTab = new bootstrap.Tab(document.querySelector("#login-tab"));
  loginTab.show();
});



// ==================== Blog Comment System ====================

function addComment(blogId) {
  // Check if user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    // Redirect to login/signup page if not logged in
    alert("You must login/signup to comment!");
    window.location.href = "auth.html";
    return;
  }

  // Get the comment text
  const commentInput = document.getElementById("commentInput");
  const text = commentInput.value.trim();
  if (!text) return;

  // Load existing comments from localStorage
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  if (!comments[blogId]) comments[blogId] = [];

  // Add the new comment
  comments[blogId].push({ user: loggedInUser.name, text });
  localStorage.setItem("comments", JSON.stringify(comments));

  // Clear input and reload comments
  commentInput.value = "";
  loadComments(blogId);
}

// Function to load comments on blog detail page
function loadComments(blogId) {
  const comments = JSON.parse(localStorage.getItem("comments")) || {};
  const blogComments = comments[blogId] || [];

  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = "";

  blogComments.forEach(c => {
    const div = document.createElement("div");
    div.className = "border p-2 mb-2 rounded";
    div.innerHTML = `<strong>${c.user}</strong>: ${c.text}`;
    commentsContainer.appendChild(div);
  });
}

// On Blog Page Load
const blogId = document.body.getAttribute("data-blog-id");
if (blogId) loadComments(blogId);



/* Blog Detail Page Styles */
function addComment(blogId) {
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (!text) return;

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  commentDiv.innerHTML = `
    <strong>User</strong>: ${text}
    <div class="comment-actions">
      <button onclick="likeComment(this)">👍 Like (<span>0</span>)</button>
      <button onclick="replyComment(this)">↩ Reply</button>
    </div>
    <div class="replies"></div>
  `;

  document.getElementById("commentsContainer").appendChild(commentDiv);
  input.value = "";
}

function likeComment(button) {
  const span = button.querySelector("span");
  span.textContent = parseInt(span.textContent) + 1;
}

function replyComment(button) {
  const replyBox = document.createElement("div");
  replyBox.innerHTML = `
    <input type="text" placeholder="Reply..." class="form-control mb-2">
    <button class="btn btn-sm btn-success" onclick="postReply(this)">Post Reply</button>
  `;
  button.parentElement.parentElement.querySelector(".replies").appendChild(replyBox);
}

function postReply(button) {
  const replyBox = button.parentElement;
  const text = replyBox.querySelector("input").value.trim();
  if (!text) return;

  const replyDiv = document.createElement("div");
  replyDiv.classList.add("comment");
  replyDiv.innerHTML = `
    <strong>User</strong>: ${text}
    <div class="comment-actions">
      <button onclick="likeComment(this)">👍 Like (<span>0</span>)</button>
      <button onclick="replyComment(this)">↩ Reply</button>
    </div>
    <div class="replies"></div>
  `;

  replyBox.parentElement.appendChild(replyDiv);
  replyBox.remove();
}
