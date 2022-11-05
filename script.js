const commentDisplayContainer = document.querySelector(
  ".comment-display-container"
);
const commentContainers = document.querySelectorAll(".comment-container");

let plusBtns = document.querySelectorAll(".plus-btn");
let minusBtns = document.querySelectorAll(".minus-btn");

const sendBtn = document.querySelector("#send-btn");

const replyBtns = document.querySelectorAll(".reply-icon-box");

const commentTextbox = document.querySelector("#comment");

replyBtns.forEach(function (currReplyBtn) {
  currReplyBtn.addEventListener("click", function () {
    const parentCont = currReplyBtn.parentElement;
    const replyRecieverName =
      parentCont.querySelector(".commentator-name").textContent;

    commentTextbox.value = `@${replyRecieverName}`;
  });
});

//generates a comment when SEND-btn is clicked
sendBtn.addEventListener("click", function () {
  const commentObj = {
    user: "juliusomo",
    avatar: "images/avatars/image-juliusomo.png",
    comment: commentTextbox.value,
  };
  generateComment(commentObj);
  commentTextbox.value = "";
  plusBtns = document.querySelectorAll(".plus-btn");
  minusBtns = document.querySelectorAll(".minus-btn");
});

//increases the score when plus-btn is clicked
plusBtns.forEach(function (currPlusBtn) {
  currPlusBtn.addEventListener("click", function () {
    const currScoreTextBox =
      currPlusBtn.parentElement.querySelector(".score-text-box");
    let x = Number(currScoreTextBox.textContent);
    x++;
    currScoreTextBox.textContent = x.toString();
  });
});

//decreases the score when minus-btn is clicked
minusBtns.forEach(function (currMinusBtn) {
  currMinusBtn.addEventListener("click", function () {
    const currScoreTextBox =
      currMinusBtn.parentElement.querySelector(".score-text-box");
    let x = Number(currScoreTextBox.textContent);
    x--;
    currScoreTextBox.textContent = x.toString();
  });
});

//generates a comment
function generateComment(commentObj) {
  // console.log(commentObj)
  let x = `
      <!--Single comment-->
      <div class="comment-container">
        <div class="comment-box">
          <div class="score-box">
            <button class="plus-btn score-btn">+</button>
            <div class="score-text-box">0</div>
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
        <!--whenever a reply is made, add this element using javascript "innerHTML property"
                <div class="reply-box"></div>-->
      </div>
      <!--Single comment ends-->
      `;
  commentDisplayContainer.innerHTML += x;
}
