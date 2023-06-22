
/*Size-slider script*/

const sizeSlider = document.getElementById("size-slider");
let sizeSliderValue = document.getElementById("size-slider-value");

sizeSlider.addEventListener("input", function() {
  sizeSliderValue.textContent = this.value;
});

/*Color-picker script*/

const colorPicker = document.getElementById("color-picker");
let colorPickerValue = document.getElementById("color-picker-value");

colorPicker.addEventListener("input", function() {
  colorPickerValue.textContent = this.value;
});
