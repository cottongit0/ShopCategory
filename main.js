// json item을 가져온다.
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// 아이템을 배열에 추가한다.
function displayItems(items) {
  const container = document.querySelector("#items");
  container.innerHTML = items.map((items) => createHTMLstring(items)).join("");
  console.log($(items));
}

// HTML에 추가한다.
function createHTMLstring(items) {
  return `        
    <li class="item">
        <img src="${items.image}" alt="${items.type}" class="item__img"> 
        <span class="item__description">${items.gender}, ${items.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector("#logo");
  const buttons = document.querySelector("#buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
