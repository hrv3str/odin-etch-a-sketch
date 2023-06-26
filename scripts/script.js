let fieldSize = 16; // Value got from the size slider
const sketchField = document.getElementById("sketch-field"); // Value stores the sketch-field div
let cellColor = '#bb00ff'; //Value got from the color picker
let squareQuantity = 256; // Quantity of squares in grid
let colorMode = 'standart'; // Value stores the color mode
let grid = sketchField.childNodes; // Nodelist of all squares in sketchField
/*Draw squares script*/

function drawSquares(squareQuantity) {
  const height = sketchField.offsetHeight;
  for (let i = 0; i < squareQuantity; i++) {
    let cell = document.createElement('div');
    cell.style.height = `${height / fieldSize - 0.5}px`;
    cell.style.width = `${height / fieldSize - 0.5}px`;
    cell.style.backgroundColor = '#c4bbf0';
    cell.style.boxShadow = '0px 0px 2px #c4bbf0';
    sketchField.appendChild(cell);
    grid = sketchField.childNodes;
  }
};

drawSquares(squareQuantity); //Puts cells in grid
listenGrid(grid); //Adds listeners to the cells

/* Clear field script*/

function clearField() { //removes all children of 'sketchField'
while (sketchField.firstChild) {
  sketchField.removeChild(sketchField.firstChild);
}
};

/*Painting squares*/

function paintStandart(targetCell) { //Paints cell with chosen color
  targetCell.style.backgroundColor = cellColor;
  targetCell.style.boxShadow = `0px 0px 4px ${cellColor}`;
}

function paintGrayscale(targetCell) { //Paints cell with random grayscale color
  let randomOp = Math.floor(Math.random() * 11) * 10;
  targetCell.style.backgroundColor = `hsl(0 0% ${randomOp}%)`;
  targetCell.style.boxShadow = `0px 0px 4px hsl(0 0% ${randomOp}%)`;
}

function paintRaibow(targetCell) { //paints cell with random color
  let randomR = Math.floor(Math.random() * 256);
  let randomB = Math.floor(Math.random() * 256);
  let randomG = Math.floor(Math.random() * 256);
  targetCell.style.backgroundColor = `rgb(${randomR}, ${randomB}, ${randomG})`;
  targetCell.style.boxShadow = `0px 0px 4px rgb(${randomR}, ${randomB}, ${randomG})`;
}

function erase(targetCell) { //Paints cell with the default color
  targetCell.style.backgroundColor = '#c4bbf0';
  cell.style.boxShadow = '0px 0px 2px #c4bbf0';
}

function paint(targetCell) { //Switch depending on chosen color mode
  switch(colorMode) {
    case "standart":
      paintStandart(targetCell);
      break;
    case "grayscale":
      paintGrayscale(targetCell);
      break;
    case "rainbow":
      paintRaibow(targetCell);
      break;
    case "eraser":
      erase(targetCell);
      break;
  }
}

/*Size-slider script*/

const sizeSlider = document.getElementById("size-slider");
let sizeSliderValue = document.getElementById("size-slider-value");

sizeSlider.addEventListener("input", function() {
  fieldSize = this.value;
  squareQuantity = fieldSize * fieldSize;
  sizeSliderValue.textContent = `${fieldSize} x ${fieldSize}`;
  clearField();
  drawSquares(squareQuantity);
  grid = sketchField.childNodes;
  listenGrid(grid);
  console.log(`Field size is ${fieldSize}.`);
});

/*Color-picker script*/

const colorPicker = document.getElementById("color-picker");
let colorPickerValue = document.getElementById("color-picker-value");

colorPicker.addEventListener("input", function() {
  cellColor = this.value;
  colorPickerValue.textContent = cellColor;
  console.log(`Picked color ${cellColor}.`);
});

/*Color mode switch*/

const colorSwitch = document.getElementsByName("scheme-selector");

for (let radio of colorSwitch) {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      colorMode = radio.value;
      console.log(`Color mode changed to ${colorMode}`);
        if (colorMode === 'reboot') {
          clearField();
          drawSquares(squareQuantity);
          grid = sketchField.childNodes;
          listenGrid(grid);
          colorSwitch[0].checked = true;
          colorMode = 'standart';
        }
    }
  });
}

/*Cell listener*/

function listenGrid(grid) {
  let isMouseDown = false;
  let targetCell;
  grid.forEach(cell => {
    cell.addEventListener('mouseover', event => {
      if (isMouseDown) {
        targetCell = event.target;
        paint(targetCell);
      }
    });
    cell.addEventListener('click', event => {
      targetCell = event.target;
      paint(targetCell);
    });
  });
  document.addEventListener('mousedown', () => isMouseDown = true);
  document.addEventListener('mousemove', event => {
    if (isMouseDown) {
      let hoveredCell = document.elementFromPoint(event.clientX, event.clientY);
      let isHoveredCellInGrid = [...grid].includes(hoveredCell);
      if (isHoveredCellInGrid) {
        targetCell = hoveredCell;
        paint(targetCell);
      }
    }
  });
  document.addEventListener('mouseup', () => isMouseDown = false);
}