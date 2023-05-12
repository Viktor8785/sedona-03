/* MODAL */
const link = document.querySelector('.navigation-item-info');
const close = document.querySelector('.modal-close');
const popup = document.querySelector('.modal-adv');

/* PRICE RANGE */
const pageContainer = document.querySelector('.page-container');
const filterFormPrice = document.querySelector('.filter-form-price');
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const sliderBarLeft = document.querySelector('.slider-bar-left');
const sliderBarRight = document.querySelector('.slider-bar-right');
const sliderThumbLeft = document.querySelector('.slider-thumb-left');
const sliderThumbRight = document.querySelector('.slider-thumb-right');
const priceInputFrom = document.querySelector('.price-input-from');
const priceInputTo = document.querySelector('.price-input-to');
const minPrice = 0;
const maxPrice = 4000;
const priceRatio = maxPrice / (slider.offsetWidth - sliderThumbLeft.offsetWidth);
let isDraggingLeft = false;
let isDraggingRight = false;
let xPosLeft = 0;
let xPosRight = slider.offsetWidth - sliderThumbRight.offsetWidth;
let maxXPosLeft = 0;
let maxXPosRight = 0;

/* MODAL */
link.addEventListener('click', function(evt){
  evt.preventDefault();
  popup.classList.add('modal-adv-show');
});
close.addEventListener('click', function(evt){
  evt.preventDefault();
  popup.classList.remove('modal-adv-show');
});
window.addEventListener("keydown", (evt) => {
  keyDown(evt);
});

function keyDown(evt) {
  if(evt.key === "Escape") {
    if(popup.classList.contains("modal-adv-show")) {
      evt.preventDefault();
      popup.classList.remove('modal-adv-show');
      const focused = document.activeElement;
      focused.blur();
    };
  };
};

/* HOTELS PRICE */
priceInputFrom.addEventListener('input', (e) => {
  let inputPriceMin = Number(priceInputFrom.value);
  if (Number.isNaN(inputPriceMin) || inputPriceMin < 0) {
    inputPriceMin = 0;
    priceInputFrom.value = inputPriceMin;
  };
  if (inputPriceMin > maxPrice) {
    inputPriceMin = maxPrice;
    priceInputFrom.value = inputPriceMin;
  };
  xPosLeft = inputPriceMin / priceRatio;
  sliderThumbLeftDragg();
});

priceInputTo.addEventListener('input', (e) => {
  let inputPriceMax = Number(priceInputTo.value);
  if (Number.isNaN(inputPriceMax) || inputPriceMax > maxPrice) {
    inputPriceMax = maxPrice;
    priceInputTo.value = inputPriceMax;
  }
  if (inputPriceMax < 0) {
    inputPriceMax = 0;
    priceInputTo.value = inputPriceMax;
  }
  xPosRight = inputPriceMax / priceRatio;
  sliderThumbRightDragg();
});

sliderThumbLeft.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDraggingLeft = true;
});

sliderThumbLeft.addEventListener('touchstart', (e) => {
  isDraggingLeft = true;
});

sliderThumbRight.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDraggingRight = true;
});

sliderThumbRight.addEventListener('touchstart', (e) => {
  isDraggingRight = true;
});

sliderContainer.addEventListener('mousemove', (e) => {
  if (isDraggingLeft) {
    xPosLeft = e.pageX - sliderContainer.offsetLeft - pageContainer.offsetLeft;
    sliderThumbLeftDragg();
    priceInputFrom.value = Math.round(xPosLeft * priceRatio);
  };
  if (isDraggingRight) {
    xPosRight = e.pageX - sliderContainer.offsetLeft - pageContainer.offsetLeft;
    sliderThumbRightDragg();
    priceInputTo.value = Math.round(xPosRight * priceRatio);
  };
  return;
});

sliderContainer.addEventListener('touchmove', (e) => {
  if (isDraggingLeft) {
    xPosLeft = e.pageX - sliderContainer.offsetLeft - pageContainer.offsetLeft;
    sliderThumbLeftDragg();
    priceInputFrom.value = Math.round(xPosLeft * priceRatio);
  };
  if (isDraggingRight) {
    xPosRight = e.pageX - sliderContainer.offsetLeft - pageContainer.offsetLeft;
    sliderThumbRightDragg();
    priceInputTo.value = Math.round(xPosRight * priceRatio);
  };
  return;
});

document.addEventListener('mouseup', (e) => {
  e.preventDefault();
  isDraggingLeft = false;
  isDraggingRight = false;
});

document.addEventListener('touchend', (e) => {
  isDraggingLeft = false;
  isDraggingRight = false;
});

function sliderThumbLeftDragg() {
  maxXPosLeft = slider.offsetWidth - sliderThumbLeft.offsetWidth;
  if (xPosLeft < 0) xPosLeft = 0;
  if (xPosLeft > maxXPosLeft) xPosLeft = maxXPosLeft;
  if (xPosLeft > xPosRight - sliderThumbRight.offsetWidth) xPosLeft = xPosRight - sliderThumbRight.offsetWidth;
  sliderThumbLeft.style.left = String(xPosLeft) + 'px';
  sliderBarLeft.style.width = String(xPosLeft + sliderThumbLeft.offsetWidth / 2) + 'px';
}

function sliderThumbRightDragg() {
  maxXPosRight = slider.offsetWidth - sliderThumbRight.offsetWidth;
  if (xPosRight < 0) xPosRight = 0;
  if (xPosRight < xPosLeft + sliderThumbLeft.offsetWidth) xPosRight = xPosLeft + sliderThumbLeft.offsetWidth;
  if (xPosRight > maxXPosRight) {
    xPosRight = maxXPosRight;
  }
  sliderThumbRight.style.left = String(xPosRight) + 'px';
  sliderBarRight.style.width = String(slider.offsetWidth - xPosRight - sliderThumbRight.offsetWidth / 2) + 'px';
}
