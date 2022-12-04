let editFlag = false;

const comments = [
  {
    id: 1,
    user: "amyrobson",
    avatar: "images/avatars/image-amyrobson.png",
    comment:
      "So recently, the US is almost struggling with a recession especially in the tech industry. I have no idea how long will it last, but certainly it is going to impact many lives.",
    score: "27",
    replies: [],
  },
  {
    id: 2,
    user: "maxblagun",
    avatar: "images/avatars/image-maxblagun.png",
    comment:
      "I share this with great sorrow that I have been one of the victims of the ongoing layoffs being conducted in META. My journey in the company has been full of adventures.",
    score: "11",
    replies: [
      {
        id: 0.483214351,
        user: "ramsesmiron", 
        avatar: "images/avatars/image-ramsesmiron.png",
        comment: "I cannot even understand the pain of the laid off employees. Please do tell me if I can be of any help for you.", 
        score: 19,
        replies: [], 
      },
    ],
  },
  {
    id: 3,
    user: "ramsesmiron",
    avatar: "images/avatars/image-ramsesmiron.png",
    comment:
      "My deepest sympathies to all who have been affected by the current lay-offs going on in the United States. I will soon be sharing a list of companies in my contact which are in need of skilled employees",
    score: "13",
    replies: [
      {
        id: 0.45738214351, 
        user: "juliusomo",
        avatar: "images/avatars/image-juliusomo.png",
        comment: "Dear sir, I have been a great admirer of you since you started your own company 10 years ago. I would be delighted to volunteer for your company in helping people getting jobs in this recession", 
        score: 5,
        replies: [], 
      },
    ],
  },
];

const commentContainers = document.querySelectorAll(".comment-container");
const commentDisplayContainer = document.querySelector(
  ".comment-display-container"
);
const sendBtn = document.querySelector("#send-btn");
const commentTextbox = document.querySelector(".comment");
let plusBtn, minusBtn;

window.addEventListener("DOMContentLoaded", render);

//generates a comment when SEND-btn is clicked
sendBtn.addEventListener("click", function () {
  const commentObj = {
    id: Math.random(),
    user: "juliusomo",
    avatar: "images/avatars/image-juliusomo.png",
    comment: commentTextbox.value,
    score: "0",
    replies: [],
  };
  generateComment(commentObj, true);
  commentTextbox.value = "";
});

//function to increase score
function incScore(e) {
  const scoreBox = e.currentTarget.parentElement;
  // console.log(scoreBox)
  const commentCont = scoreBox.parentElement;
  const contID = Number(commentCont.getAttribute("cont-id"));
  // console.log(commentCont);

  let scoreTextEl = scoreBox.querySelector(".score-text-box");
  let x = Number(scoreTextEl.textContent);
  x++;
  scoreTextEl.textContent = x.toString();

  const items = JSON.parse(localStorage.getItem("comments"));
  //find the id in the comments and update
  items.filter(function (item) {
    if (item.id === contID) {
      item.score = x.toString();
    } else {
      //if not found in the current comment, check in the replies of current comment
      const replies = item.replies;
      replies.filter(function (reply) {
        if (reply.id === contID) {
          reply.score = x.toString();
        }
      });
    }
    return item;
  });
  localStorage.setItem("comments", JSON.stringify(items));
}

//function to decrease score
function decScore(e) {
  const scoreBox = e.currentTarget.parentElement;
  // console.log(scoreBox)
  const commentCont = scoreBox.parentElement;
  const contID = Number(commentCont.getAttribute("cont-id"));
  // console.log(commentCont);

  let scoreTextEl = scoreBox.querySelector(".score-text-box");
  let x = Number(scoreTextEl.textContent);
  x--;
  if (x < 0) {
    x = 0;
  }
  scoreTextEl.textContent = x.toString();

  const items = JSON.parse(localStorage.getItem("comments"));
  //find the id in the comments and update
  items.filter(function (item) {
    if (item.id === contID) {
      item.score = x.toString();
    } else {
      //if not found in the current comment, check in the replies of current comment
      const replies = item.replies;
      replies.filter(function (reply) {
        if (reply.id === contID) {
          reply.score = x.toString();
        }
      });
    }
    return item;
  });
  localStorage.setItem("comments", JSON.stringify(items));
}

//renders the comments stored in localStorage
function render() {
  commentDisplayContainer.innerHTML = ""; //testing basis
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

  //testing basis
  plusBtn = document.querySelectorAll(".plus-btn");
  minusBtn = document.querySelectorAll(".minus-btn");
  plusBtn.forEach(function (item) {
    item.addEventListener("click", incScore);
  });
  minusBtn.forEach(function (item) {
    item.addEventListener("click", decScore);
  });
  // console.log(plusBtn);
}

//function to generate/render new comment
function generateComment(commentObj, createNewFlag) {
  const element = document.createElement("div");
  element.classList.add("comment-container");
  commentDisplayContainer.appendChild(element);

  const replyArr = commentObj.replies;
  let y = "";
  if (replyArr.length > 0) {
    replyArr.forEach(function (replyItem) {
      y += `
      <div class="comment-box" cont-id = "${replyItem.id}">
        <div class="score-box">
          <button class="plus-btn score-btn">+</button>
          <div class="score-text-box">${replyItem.score}</div>
          <button class="minus-btn score-btn">-</button>
        </div>
    
        <div class="comment-main-box">
          <div class="commentator-info-box">
            <div class="commentator-avatar-box">
              <img
                class="commentator-avatar-icon"
                src=${replyItem.avatar}
                alt=""
              />
            </div>
            <div class="commentator-name">${replyItem.user}</div>
            <p class="user-label ${replyItem.user} ">YOU</p>
          </div>
    
          <div class="comment-text-box">
            ${replyItem.comment}
          </div>
        </div>
      </div>
      `;
    });
  }

  let x = `
        <div class="comment-box" cont-id = "${commentObj.id}">
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
              <p class="user-label ${commentObj.user} ">YOU</p>
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

            <div class="read-reply-box">
              <button class="read-reply-btn">Replies</button>
            </div>
          </div>
        </div>

        <!--reply-Comment-Box-->

        <div class = "reply-box">

          <!--section where the replies will be displayed-->

          <div class = "reply-display-container">
            ${y}
          </div>

          <!--section where user will write the reply and send it-->

          <div class="reply-comment-container hide">
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
            <button id="reply-btn">SEND</button>
          </div>
        </div>
        

        <!--whenever a reply is made, add this element using javascript "innerHTML property"
                <div class="reply-box"></div>-->
      `;

  element.innerHTML = x;
  if (createNewFlag) {
    addToLocalStorage(commentObj);
  }

  //attach specific user-label to our comments/replies
  const userLabels = document.querySelectorAll(".user-label");
  userLabels.forEach((item)=>{
    const username = item.parentElement.querySelector(".commentator-name").textContent;
    if(username !== "juliusomo"){
      item.classList.add("hide")
    }
  });


  //add event-listeners to newly generate comment
  const replyIcon = element.querySelector(".reply-icon-box");
  const showReplyBtn = element.querySelector(".read-reply-btn");
  plusBtn = element.querySelector(".plus-btn");
  minusBtn = element.querySelector(".minus-btn");
  replyIcon.addEventListener("click", reply);
  showReplyBtn.addEventListener("click",showReply)
  plusBtn.addEventListener("click", incScore);
  minusBtn.addEventListener("click", decScore);
}

function showReply(e){
  // console.log()
  const commentContainer = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
  const replyDispCont = commentContainer.querySelector(".reply-display-container");
  replyDispCont.classList.toggle("hide");
  // e.currentTarget.textContent = "Hide Replies";
  // console.log()
}

//function to add the newly generated comment to localStorage
function addToLocalStorage(item) {
  const items = localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : [];
  items.push(item);
  localStorage.setItem("comments", JSON.stringify(items));
}

//reply function (triggered when reply-btn is clicked)
function reply(e) {
  // showReply(e);
  const element = e.currentTarget.parentElement.parentElement.parentElement;
  // console.log(element);
  const id = element.getAttribute("cont-id");
  // console.log(id)
  const receiver = element.querySelector(".commentator-name").textContent;
  // console.log(receiver)

  const replyCommentCont = element.parentElement.querySelector(
    ".reply-comment-container"
  );
  // console.log(replyCommentCont)
  replyCommentCont.classList.toggle("hide");
  const replyTextBox = replyCommentCont.querySelector(".reply-comment");
  // console.log(replyTextBox)
  const replyDisplayCont = element.querySelector(".reply-display-container");

  editFlag = true;
  replyTextBox.value = `@${receiver} `;

  const replyBtn = replyCommentCont.querySelector("#reply-btn");
  replyBtn.addEventListener("click", function () {
    // console.log("reply sent");
    const item = {
      id: Math.random(),
      user: "juliusomo",
      avatar: "images/avatars/image-juliusomo.png",
      comment: replyTextBox.value,
      score: 0,
      replies: [],
    };
    let items = JSON.parse(localStorage.getItem("comments"));
    items.filter(function (comment) {
      if (comment.id == id) {
        comment.replies.push(item);
      }
      return item;
    });
    localStorage.setItem("comments", JSON.stringify(items));
    replyCommentCont.classList.toggle("hide");
    render();
  });
}
