let fieldSize = 16; // Value got from the size slider
const sketchField = document.getElementById("sketch-field"); // Value stores the sketch-field div
let cellColor = '#bb00ff'; //Value got from the color picker
let squareQuantity = 256; // Quantity of squares to draw

/*Draw squares script*/

function drawSquares(squareQuantity) {
  const height = sketchField.offsetHeight;
  for (let i = 0; i < squareQuantity; i++) {
    let cell = document.createElement('div');
    cell.style.height = `${height / fieldSize - 0.5}px`;
    cell.style.width = `${height / fieldSize - 0.5}px`;
    cell.style.backgroundColor = '#c4bbf0';
    sketchField.appendChild(cell);
  }
};

drawSquares(squareQuantity);

/* Clear field script*/
function clearField() {
while (sketchField.firstChild) {
  sketchField.removeChild(sketchField.firstChild);
}
};


/*Size-slider script*/

const sizeSlider = document.getElementById("size-slider");
let sizeSliderValue = document.getElementById("size-slider-value");

sizeSlider.addEventListener("input", function() {
  fieldSize = this.value;
  squareQuantity = fieldSize * fieldSize;
  sizeSliderValue.textContent = `${fieldSize} x ${fieldSize}`;
  clearField();
  drawSquares(squareQuantity);
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


