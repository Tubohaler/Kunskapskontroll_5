// import $ from "jquery";

const mainElement = document.querySelector("main");
const displayPage = document.querySelector("h6");

// knapparna
const backwardsButton = document.querySelector(".previous");
const forwardButton = document.querySelector(".next");

let counter = 0;

//Page counter
function updatePageNr() {
  displayPage.textContent = `Showing page ${counter}`;
}

async function fetchingImg() {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=12&page=${counter}&order=asc`,

    {
      headers: {
        "x-api-key": "b8c65b83-ea7e-4cf3-9028-f4d1e02212a4",
      },
    }
  );
  const data = await response.json();

  mainElement.textContent = null;

  data.forEach(async (item) => {
    console.log(item.url);

    const div = document.createElement("div");
    div.classList.add("cat");
    mainElement.append(div);

    const img = document.createElement("img");
    img.src = item.url;
    div.append(img);
  });
}

function incrementCounter() {
  counter++;
  backwardsButton.disabled = false;
  updatePageNr(displayPage);
  console.log(counter);
  fetchingImg();
}

function decrementCounter() {
  if (counter === 0) {
    backwardsButton.disabled = true;
  } else {
    counter--;
    fetchingImg();
  }
  console.log(counter);
  updatePageNr(displayPage);
  console.log(counter);
}
// Event
async function setUpListeners() {
  forwardButton.addEventListener("click", incrementCounter);
  backwardsButton.addEventListener("click", decrementCounter);
}
setUpListeners();
fetchingImg();
updatePageNr();
