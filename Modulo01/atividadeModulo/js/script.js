window.addEventListener("load", start);
var rgb = [0, 0, 0];
function start() {
  var redButton = document.querySelector("#red");
  var greenButton = document.querySelector("#green");
  var blueButton = document.querySelector("#blue");
  redButton.addEventListener("change", onChanceEvent);
  greenButton.addEventListener("change", onChanceEvent);
  blueButton.addEventListener("change", onChanceEvent);
}

function onChanceEvent(event) {
  var inputRangeId = event.target.id;
  var colorValue = event.target.value;
  var inputButton = document.querySelector("#input" + inputRangeId);
  inputButton.value = colorValue;
  updateVector(colorValue, inputRangeId);

  renderPallet(createStyleClass());
}

function updateVector(colorValue, inputRangeId) {
  switch (inputRangeId) {
    case "red": {
      rgb[0] = colorValue;
      break;
    }
    case "green": {
      rgb[1] = colorValue;
      break;
    }
    case "blue": {
      rgb[2] = colorValue;
      break;
    }
    default:
      break;
  }
}

function createStyleClass() {}

function renderPallet() {
  var palette = document.querySelector(".palette");
  palette.setAttribute(
    "style",
    "background-color: rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"
  );
}
