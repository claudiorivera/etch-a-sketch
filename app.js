// Selectors
const appContainer = document.querySelector("#appContainer");
const resetButton = document.querySelector("#resetButton");

// Initial values
const CONTAINER_SIZE = 600;
const INITIAL_GRID_SIZE = 16;
appContainer.style.width = `${CONTAINER_SIZE}px`;
appContainer.style.height = appContainer.style.width;

// Function that makes a new grid and adds event listeners that
// make the background color on the square 10% darker on each pass
const makeGrid = (size) => {
  // Make the grid container and set its flex propertis
  const gridContainer = document.createElement("div");
  gridContainer.style.display = "flex";
  gridContainer.style.flexFlow = "row wrap";
  gridContainer.style.alignContent = "stretch";
  // Make the squares
  for (i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    // Set the width and height to one fraction of the container size
    square.style.width = `${CONTAINER_SIZE / size}px`;
    square.style.height = square.style.width;
    gridContainer.appendChild(square);
  }
  appContainer.appendChild(gridContainer);
  // Create the event listeners that change the background color
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    let pass = 0;
    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = `hsl(0, 0%, ${100 - (pass += 10 % 100)}%)`;
    });
  });
};

// Entry Point
makeGrid(INITIAL_GRID_SIZE);

// Listen for reset event and create a new grid
resetButton.addEventListener("click", () => {
  const gridSize = prompt("Enter grid size:", "16");
  // Empty the appContainer first
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (appContainer.firstChild) {
    appContainer.firstChild.remove();
  }
  makeGrid(gridSize);
});
