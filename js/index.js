/* MODAL */
const link = document.querySelector('.navigation-item-info');
const close = document.querySelector('.modal-close');
const popup = document.querySelector('.modal-adv');

/* HOTELS FORM */
let adultsNumber = document.querySelector('[name=adults]');
let childrenNumber = document.querySelector('[name=children]');
const adultsMinus = document.querySelector('.search-number.search-minus.adults');
const adultsPlus = document.querySelector('.search-number.search-plus.adults');
const childrenMinus = document.querySelector('.search-number.search-minus.children');
const childrenPlus = document.querySelector('.search-number.search-plus.children');
const searchDateIn = document.querySelector('.search-date-in');
const searchDateOut = document.querySelector('.search-date-out');
const dateOutInput = document.querySelector('#search-departure-date');
const dateInInput = document.querySelector('#search-arrival-date');

/* CALENDAR */
let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let monthsInput = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
let weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let prevMonth = document.getElementById("prev-month");
let nextMonth = document.getElementById("next-month");
let monthCurrent = document.getElementById("month-current");
//let yearCurrent = document.getElementById("year-current");
let yearSelect = document.getElementById("year-select");
let calendarBody = document.getElementById("calendar-body");
const calendarWrapper = document.querySelector('.calendar-wrapper');
const buttonClose = document.querySelector('.button-close');
let dateIn = false;
let dateOut = false;

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
  if(evt.key === "Escape") {
    if(calendarWrapper.classList.contains("calendar-active")) {
      evt.preventDefault();
      calendarWrapper.classList.remove('calendar-active');
      const focused = document.activeElement;
      focused.blur();
    };
  };
};

/* HOTELS FORM */
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

/* CALENDAR */
searchDateIn.addEventListener('click', (evt) => {
  if (!calendarWrapper.classList.contains('calendar-active')) {
    dateIn = true;
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    yearSelect.value = currentYear;
    showCalendar(currentYear, currentMonth);
    calendarWrapper.classList.add('calendar-active');
  }
});

searchDateOut.addEventListener('click', (evt) => {
  if (!calendarWrapper.classList.contains('calendar-active')) {
    dateOut = true;
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth()
    yearSelect.value = currentYear;
    showCalendar(currentYear, currentMonth);
    calendarWrapper.classList.add('calendar-active');
  }
});

buttonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  calendarWrapper.classList.remove('calendar-active');
});

/*document.querySelector('body').addEventListener('click', function(e){
    if(calendarWrapper.classList.contains('calendar-active')) {
      if (dateIn) {
        dateInInput.focus();
      };
      if (dateOut) {
        dateOutInput.focus();
      }
    };
});*/

calendarWrapper.onclick = (evt) => {
  let target = evt.target;
  if (target.tagName == 'TD') {
    pastInput(target);
  }
}

function pastInput(td) {
  if (dateIn) {
    dateIn = false;
    inputFormatter(td, dateInInput);
  };
  if (dateOut) {
    dateOut = false;
    inputFormatter(td, dateOutInput);
  }
  calendarWrapper.classList.remove('calendar-active');
  const focused = document.activeElement;
  focused.blur();
}

function inputFormatter(td, di) {
  let date = td.innerHTML + ' ' + monthsInput[currentMonth] + ' ' + currentYear;
  di.value = date;
}

prevMonth.addEventListener('click', () => {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
    yearSelect.value = currentYear;
  } else {
    currentMonth--;
  }
  showCalendar(currentYear, currentMonth);
});

nextMonth.addEventListener('click', () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  showCalendar(currentYear, currentMonth);
});

yearSelect.onchange = function() {
  currentYear = yearSelect.value;
  showCalendar(currentYear, currentMonth);
}

yearSelect.onblur = function() {
  yearSelect.value = currentYear;
}

function createYears() {
  for (i = 1900; i <= 2100; i++) {
    let option = document.createElement("option");
    option.value = i;
    if (i == currentYear) {
      option.selected = true;
    }
    let optionText = document.createTextNode(i);
    option.appendChild(optionText);
    yearSelect.appendChild(option);
  }
}

function init() {
  createYears();
  showCalendar(currentYear, currentMonth);
}

function showCalendar(year, month) {
  let firstDay = (new Date(year, month)).getDay() - 1;
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  calendarBody.innerHTML = "";
  monthCurrent.innerHTML = months[month];
  let nextDateAdd = false;
  let prevDate = 0;
  let date = 1;
  for (var i = 0; i < 6; i++) {
    if (nextDateAdd ) break;
	var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode((new Date(year, month, -firstDay + j + 1)).getDate());
        cell.classList.add('prev-month');
        cell.appendChild(cellText);
        row.appendChild(cell);
		prevDate++;
      }else {
		if (date > daysInMonth && !nextDateAdd) {
      let nextMonthDays = 7 - ((date + prevDate - 1) % 7);
		  if (nextMonthDays == 0 || nextMonthDays == 7 ) break;
		  for (let k = 1; k <= nextMonthDays; k++) {
		    let cell = document.createElement("td");
        let cellText = document.createTextNode(k);
			  cell.classList.add('next-month');
        cell.appendChild(cellText);
        row.appendChild(cell);
		  }
		  nextDateAdd = true;
		  break;
        }else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            cell.classList.add("today");
          }
          cell.classList.add('this-month');
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }
    }
    calendarBody.appendChild(row);
  }
 }

init();
