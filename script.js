let editFlag = false;

const comments = [
  {
    id: 1,
    user: "amyrobson",
    avatar: "images/avatars/image-amyrobson.png",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,temporibus saepe optio illo magnam sit aut vero voluptates at eligendi?",
    score: "10",
  },
  {
    id: 2,
    user: "maxblagun",
    avatar: "images/avatars/image-maxblagun.png",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,temporibus saepe optio illo magnam sit aut vero voluptates at eligendi?",
    score: "10",
  },
  {
    id: 3,
    user: "ramsesmiron",
    avatar: "images/avatars/image-ramsesmiron.png",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,temporibus saepe optio illo magnam sit aut vero voluptates at eligendi?",
    score: "10",
  },
];

const commentContainers = document.querySelectorAll(".comment-container");
const commentDisplayContainer = document.querySelector(
  ".comment-display-container"
);
const sendBtn = document.querySelector("#send-btn");
const commentTextbox = document.querySelector(".comment");

window.addEventListener("DOMContentLoaded", render);

//generates a comment when SEND-btn is clicked
sendBtn.addEventListener("click", function () {
  const commentObj = {
    id: Math.random(),
    user: "juliusomo",
    avatar: "images/avatars/image-juliusomo.png",
    comment: commentTextbox.value,
    score: "0",
  };
  generateComment(commentObj, true);
  commentTextbox.value = "";
});

//function to increase score
function incScore(e) {
  const scoreBox = e.currentTarget.parentElement;
  const commentCont = scoreBox.parentElement.parentElement;
  const contID = Number(commentCont.getAttribute("cont-id"));

  let scoreTextEl = scoreBox.querySelector(".score-text-box");
  let x = Number(scoreTextEl.textContent);
  x++;
  scoreTextEl.textContent = x.toString();

  const items = JSON.parse(localStorage.getItem("comments"));
  items.filter(function (item) {
    if (item.id === contID) {
      item.score = x.toString();
    }
    return item;
  });
  localStorage.setItem("comments", JSON.stringify(items));
}

//function to decrease score
function decScore(e) {
  const scoreBox = e.currentTarget.parentElement;
  const commentCont = scoreBox.parentElement.parentElement;
  const contID = Number(commentCont.getAttribute("cont-id"));

  let scoreTextEl = scoreBox.querySelector(".score-text-box");
  let x = Number(scoreTextEl.textContent);
  x--;
  scoreTextEl.textContent = x.toString();

  const items = JSON.parse(localStorage.getItem("comments"));
  items.filter(function (item) {
    if (item.id === contID) {
      item.score = x.toString();
    }
    return item;
  });
  localStorage.setItem("comments", JSON.stringify(items));
}

//renders the comments stored in localStorage
function render() {
  let items = localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : [];

  if (items.length === 0) {
    items = comments;
    localStorage.setItem("comments", JSON.stringify(items));
  }
  items.forEach(function (item) {
    generateComment(item, false);
  });
}

//function to generate/render new comment
function generateComment(commentObj, createNewFlag) {
  const element = document.createElement("div");
  element.classList.add("comment-container");
  element.setAttribute("cont-id", commentObj.id);
  commentDisplayContainer.appendChild(element);

  let x = `
        <div class="comment-box">
          <div class="score-box">
            <button class="plus-btn score-btn">+</button>
            <div class="score-text-box">${commentObj.score}</div>
            <button class="minus-btn score-btn">-</button>
          </div>
  
          <div class="comment-main-box">
            <div class="commentator-info-box">
              <div class="commentator-avatar-box">
                <img
                  class="commentator-avatar-icon"
                  src=${commentObj.avatar}
                  alt=""
                />
              </div>
              <div class="commentator-name">${commentObj.user}</div>
              <div class="reply-icon-box">
                <img
                  src="images/icon-reply.svg"
                  alt="reply-icon"
                  class="reply-icon"
                />
              </div>
            </div>
  
            <div class="comment-text-box">
              ${commentObj.comment}
            </div>
          </div>
        </div>

        <!--reply-Comment-Box-->

        <div class = "reply-box hide">
          <div class="reply-comment-container ">
            <div id="avatar-img-container">
              <img
                id="avatar-img"
                src="images/avatars/image-juliusomo.png"
                alt="avatar"
              />
            </div>
            <textarea
              name="comment"
              class="comment reply-comment"
              placeholder="Reply to this comment..."
              rows = "4"
            ></textarea>
            <button id="reply-btn">REPLY</button>
          </div>
        </div>
        

        <!--whenever a reply is made, add this element using javascript "innerHTML property"
                <div class="reply-box"></div>-->
      `;

  element.innerHTML = x;
  if (createNewFlag) {
    addToLocalStorage(commentObj);
  }

  //add event-listeners to newly generate comment
  const replyBtn = element.querySelector(".reply-icon-box");
  const plusBtn = element.querySelector(".plus-btn");
  const minusBtn = element.querySelector(".minus-btn");
  replyBtn.addEventListener("click", reply);
  plusBtn.addEventListener("click", incScore);
  minusBtn.addEventListener("click", decScore);
}

function reply(e) {
  const element =
    e.currentTarget.parentElement.parentElement.parentElement.parentElement;
  const receiver = element.querySelector(".commentator-name").textContent;
  const replyBox = element.querySelector(".reply-box");
  replyBox.classList.toggle("hide");
  const replyTextBox = element.querySelector(".reply-comment");

  editFlag = true;
  replyTextBox.value = `@${receiver} `;
  const replyBtn = element.querySelector("#reply-btn");
  // console.log(replyBtn)
  replyBtn.addEventListener("click", function () {
    console.log("reply sent");
    //store the reply in the respective receiver's object and update the local storage.
  });
}

//function to add the newly generated comment to localStorage
function addToLocalStorage(item) {
  const items = localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : [];
  items.push(item);
  localStorage.setItem("comments", JSON.stringify(items));
}
