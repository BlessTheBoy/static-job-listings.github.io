const cards = document.querySelectorAll(".job-card");
const tagContainer = document.querySelector("#tag-container");
const searchBox = document.querySelector("#search");
let tags = [];
console.log(typeof cards);
if (tags.length === 0) {
  searchBox.style.display = "none";
}

function setDisplay(jobCard) {
  console.log("setting display");
  let str = jobCard.dataset.tags;
  if (tags.every((tag) => str.includes(tag))) {
    if (window.innerWidth > 1000) {
      jobCard.style.display = "flex";
      animateCSS(jobCard);
    } else {
      jobCard.style.display = "block";
      animateCSS(jobCard);
    }
  } else {
    jobCard.style.display = "none";
  }
}

function filter() {
  //   cards.forEach((card) => setDisplay(card));
  console.log("filtering");
  for (let i = 0; i < cards.length; i++) {
    setDisplay(cards[i]);
  }
}

function addTag(tagElement) {
  let newTag = tagElement.textContent;
  if (tags.indexOf(newTag) === -1) {
    tags.push(newTag);
    tagContainer.appendChild(createTag(newTag));
  }
  searchBox.style.display = "flex";
  console.log(tags);
  filter();
}

function removeTag(tagElement) {
  let newTag =
    typeof tagElement === "string"
      ? tagElement
      : tagElement.parentNode.querySelector("p").textContent;

  console.log("removing", newTag);

  tags = tags.filter(function (item) {
    return item !== newTag;
  });

  document.querySelector(`#${tagElement}`).remove();

  if (tags.length === 0) {
    searchBox.style.display = "none";
  }

  console.log(tags);
  filter();
}

function clearTags() {
  console.log("running clear");
  tags = [];
  filter();
  let searchTags = tagContainer.querySelectorAll(".search-tag");

  for (let i = 0; i < searchTags.length; i++) {
    searchTags[i].remove();
  }
  searchBox.style.display = "none";
}

function createTag(text) {
  let searchTag = document.createElement("div");
  searchTag.classList = "search-tag animate__animated animate__rubberBand";
  searchTag.id = text;
  let tagName = document.createElement("p");
  tagName.innerText = text;
  let tagImage = document.createElement("img");
  tagImage.src = "images/icon-remove.svg";
  tagImage.onclick = () => removeTag(text);
  searchTag.appendChild(tagName);
  searchTag.appendChild(tagImage);

  return searchTag;
}
console.log(tags);

const animateCSS = (element) =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    element.classList.add("animate__animated", "animate__bounceIn");

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      element.classList.remove("animate__animated", "animate__bounceIn");
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
