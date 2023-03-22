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
function numberMinus(inputNumber) {
  let number = Number(inputNumber.value);
  if(number > 0) {
    inputNumber.value = String(--number);
  };
};
function numberPlus(inputNumber) {
  let number = Number(inputNumber.value);
  if(number < 99) {
    inputNumber.value = String(++number);
  };
};
const link = document.querySelector('.navigation-item-info');
const close = document.querySelector('.modal-close');
const popup = document.querySelector('.modal-adv');
let adultsNumber = document.querySelector('[name=adults]');
let childrenNumber = document.querySelector('[name=children]');
const adultsMinus = document.querySelector('.search-number.search-minus.adults');
const adultsPlus = document.querySelector('.search-number.search-plus.adults');
const childrenMinus = document.querySelector('.search-number.search-minus.children');
const childrenPlus = document.querySelector('.search-number.search-plus.children');
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
adultsMinus.addEventListener('click', (evt) => {
  evt.preventDefault();
  numberMinus(adultsNumber);
});
adultsPlus.addEventListener('click', (evt) => {
  evt.preventDefault();
  numberPlus(adultsNumber);
});
childrenMinus.addEventListener('click', (evt) => {
  evt.preventDefault();
  numberMinus(childrenNumber);
});
childrenPlus.addEventListener('click', (evt) => {
  evt.preventDefault();
  numberPlus(childrenNumber);
});
