'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = document.querySelector('.setup-user-name');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var j = 0;
var changeColor = function (array) {
  if (j++ >= array.length - 1) {
    j = 0;
  } else {
    j = j++;
  }
  return j;
};

var getRandomData = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var wizards = [
  {
    name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length - 1)] + ' ' +
    WIZARD_SURNAMES[getRandomData(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomData(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomData(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length - 1)] + ' ' +
    WIZARD_SURNAMES[getRandomData(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomData(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomData(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length - 1)] + ' ' +
    WIZARD_SURNAMES[getRandomData(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomData(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomData(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length - 1)] + ' ' +
    WIZARD_SURNAMES[getRandomData(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomData(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomData(0, WIZARD_EYES_COLORS.length - 1)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Еще ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  var coatColor = WIZARD_COAT_COLORS[changeColor(WIZARD_COAT_COLORS)];
  setup.querySelector('input[name="coat-color"]').value = coatColor;
  wizardCoat.style.fill = coatColor;
});

wizardEyes.addEventListener('click', function () {
  var eyesColor = WIZARD_EYES_COLORS[changeColor(WIZARD_EYES_COLORS)];
  setup.querySelector('input[name="eyes-color"]').value = eyesColor;
  wizardEyes.style.fill = eyesColor;
});

wizardFireball.addEventListener('click', function () {
  var fireballColor = FIREBALL_COLORS[changeColor(FIREBALL_COLORS)];
  setup.querySelector('input[name="fireball-color"]').value = fireballColor;
  wizardFireball.style.background = fireballColor;
});
