const mainElement = document.querySelector("main");
const displayPage = document.querySelector("h6");

// knapparna
const backwardButton = document.querySelector(".previous");
const forwardButton = document.querySelector(".next");

let pageNumber = 0;

//Page counter
function updatePageNr() {
  displayPage.textContent = `Showing page ${pageNumber}`;
}

async function fetchingImg() {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=12&page=${pageNumber}&order=asc`,

    {
      headers: {
        "x-api-key": "b8c65b83-ea7e-4cf3-9028-f4d1e02212a4",
      },
    }
  );
  const data = await response.json();

  mainElement.textContent = null;

  data.forEach(async (item) => {
    const div = document.createElement("div");
    mainElement.append(div);

    const img = document.createElement("img");
    img.src = item.url;
    div.append(img);
  });
}

function incrementCounter() {
  pageNumber++;
  backwardButton.disabled = false;
  updatePageNr(displayPage);
  fetchingImg();
}

function decrementCounter() {
  if (pageNumber === 0) {
    backwardButton.disabled = true;
  } else {
    pageNumber--;
    fetchingImg();
  }
  updatePageNr(displayPage);
}
// Event
async function setUpListeners() {
  forwardButton.addEventListener("click", incrementCounter);
  backwardButton.addEventListener("click", decrementCounter);
}
setUpListeners();
fetchingImg();
updatePageNr();
