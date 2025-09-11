// Dark mode toggle
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Back to top + reading progress
const backToTop = document.getElementById("backToTop");
window.onscroll = function() {
  // Back to top
  if(document.body.scrollTop>300 || document.documentElement.scrollTop>300){
    backToTop.style.display="block";
  } else backToTop.style.display="none";
  // Reading progress
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("readingProgress").style.width = (winScroll/height)*100 + "%";
};
backToTop.addEventListener("click", ()=>{document.documentElement.scrollTop=0;document.body.scrollTop=0;});

// Hero animated text
const heroText = document.getElementById("heroText");
const heroPhrases = ["Discover Trending Stories","Explore Creative Ideas","Read Inspiring Articles"];
let heroIndex = 0;
function typeHero(){
  heroText.textContent="";
  let phrase = heroPhrases[heroIndex];
  let i=0;
  let interval = setInterval(()=>{ 
    heroText.textContent+=phrase[i]; 
    i++; 
    if(i>=phrase.length){ 
      clearInterval(interval); 
      setTimeout(()=>{ heroIndex=(heroIndex+1)%heroPhrases.length; typeHero(); },1000);
    } 
  },100);
}
typeHero();

// Blogs data
let blogs = [
  {title:"Tech Innovations 2025",desc:"AI, Blockchain...",img:"https://source.unsplash.com/400x300/?technology"},
  {title:"Top Travel Destinations",desc:"Pack your bags...",img:"https://source.unsplash.com/400x300/?travel"},
  {title:"Delicious Food Recipes",desc:"Street food to gourmet...",img:"https://source.unsplash.com/400x300/?food"},
  {title:"Healthy Lifestyle Tips",desc:"Fitness & diet...",img:"https://source.unsplash.com/400x300/?health"},
  {title:"Finance Management",desc:"Invest smartly...",img:"https://source.unsplash.com/400x300/?finance"},
  {title:"Photography Hacks",desc:"Take better shots...",img:"https://source.unsplash.com/400x300/?photography"}
];
let blogGrid=document.getElementById("blogGrid");
let loadIndex=0,loadMore=3;
function loadBlogs(){
  for(let i=loadIndex;i<loadIndex+loadMore && i<blogs.length;i++){
    let card=document.createElement("div"); card.className="col-md-4";
    card.innerHTML=`<div class="card h-100">
      <img src="${blogs[i].img}" class="card-img-top" alt="${blogs[i].title}">
      <div class="card-body">
        <h5 class="card-title">${blogs[i].title}</h5>
        <p class="card-text">${blogs[i].desc}</p>
        <div class="d-flex justify-content-between">
          <span>❤️</span><span>💬</span><span>🔗</span>
        </div>
      </div></div>`;
    blogGrid.appendChild(card);
  }
  loadIndex+=loadMore;
  if(loadIndex>=blogs.length) document.getElementById("loadMoreBtn").style.display="none";
}
loadBlogs();
document.getElementById("loadMoreBtn").addEventListener("click", loadBlogs);

// Featured authors
let authors = [
  {name:"Alice",desc:"Tech Writer",img:"https://source.unsplash.com/200x200/?woman"},
  {name:"Bob",desc:"Travel Blogger",img:"https://source.unsplash.com/200x200/?man"}
];
let authorList=document.getElementById("authorList");
authors.forEach(a=>{
  let div=document.createElement("div"); div.className="col-md-3 col-6";
  div.innerHTML=`<div class="card h-100 author-card text-center bg-light text-dark p-2">
    <img src="${a.img}" class="card-img-top rounded-circle mx-auto mt-3" style="width:100px;">
    <div class="card-body">
      <h5 class="card-title">${a.name}</h5>
      <p class="card-text">${a.desc}</p>
    </div></div>`;
  authorList.appendChild(div);
});

// Categories
let categories=["Technology","Travel","Food","Lifestyle","Health","Finance","Photography"];
let categoryList=document.getElementById("categoryList");
categories.forEach(c=>{
  let span=document.createElement("span"); span.className="badge bg-secondary";
  span.textContent=c;
  categoryList.appendChild(span);
});

// Newsletter submit
document.getElementById("newsletterForm").addEventListener("submit", e=>{
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
