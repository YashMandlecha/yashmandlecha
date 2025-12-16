// assets/blog.js

document.querySelectorAll(".claps").forEach(section => {
  const key = "claps-" + section.dataset.post;
  const countEl = section.querySelector(".clap-count");
  let count = Number(localStorage.getItem(key)) || 0;
  countEl.textContent = count;

  section.querySelector(".clap-btn").onclick = () => {
    count++;
    localStorage.setItem(key, count);
    countEl.textContent = count;
  };
});

document.querySelectorAll(".comments").forEach(section => {
  const key = "comments-" + section.dataset.post;
  const list = section.querySelector(".comment-list");
  const input = section.querySelector(".comment-input");

  const comments = JSON.parse(localStorage.getItem(key) || "[]");
  comments.forEach(c => addComment(list, c));

  section.querySelector(".comment-submit").onclick = () => {
    if (!input.value.trim()) return;
    comments.push(input.value.trim());
    localStorage.setItem(key, JSON.stringify(comments));
    addComment(list, input.value.trim());
    input.value = "";
  };
});

function addComment(list, text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}
