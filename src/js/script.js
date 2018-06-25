(function() {
  const commentForm = document.querySelector("#comment-form");
  const comments = document.querySelector("#comments");
  const upload = document.querySelector("#upload-btn");
  const photo = document.querySelector("#photo");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  const images = [
    {
      imgUrl: "images/img1.jpg",
      comments: [{ name: "Antanas", comment: "Very nice!" }]
    },
    {
      imgUrl: "images/img2.jpg",
      comments: []
    },
    {
      imgUrl: "images/img3.jpg",
      comments: []
    },
    {
      imgUrl: "images/img4.jpg",
      comments: []
    }
  ];

  let current = window.location.href.split("=")[1] || 0;

  if (upload) {
    upload.addEventListener(
      "change",
      e => (document.querySelector("#upload-file").value = e.target.value)
    );
  }

  if (commentForm && comments) {
    updateContent(photo, images[current].imgUrl, comments, images[current].comments);

    commentForm.addEventListener("submit", handleSubmit);
    next.addEventListener("click", handleNext);
    prev.addEventListener("click", handlePrev);
  }

  function handleNext() {
    current++;
    if (current > images.length - 1) {
      current = 0;
    }
    updateContent(photo, images[current].imgUrl, comments, images[current].comments);
  }

  function handlePrev() {
    current--;
    if (current < 0) {
      current = images.length - 1;
    }
    updateContent(photo, images[current].imgUrl, comments, images[current].comments);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, comment } = e.target;

    images[current].comments.push({
      name: name.value,
      comment: comment.value
    });

    updateComents(comments, images[current].comments);
  }

  function updateContent(photo, elemImg, commentsContainer, commentsList) {
    updateImg(photo, elemImg);
    updateComents(commentsContainer, commentsList);
  }

  function updateImg(updateImg, newImg) {
    updateImg.src = newImg;
  }

  function updateComents(elem, commentsList) {
    comments.innerHTML = "";
    commentsList.forEach(item => {
      comments.innerHTML += createComment(item.name, item.comment);
    });
  }

  function createComment(name, comment) {
    return `
            <div class="comment-item">
                <figure class="avatar">
                    <img src="images/avatar.png" alt="">
                </figure>
                <div class="comment-text">
                    <h2>${name}</h2>
                    <p>${comment}</p>
                </div>
            </div>
        `;
  }
})();
