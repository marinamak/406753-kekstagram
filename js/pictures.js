'use strict';

var PICTURES_NUMBER = 25;
var LIKES_NUMBER_MIN = 15;
var LIKES_NUMBER_MAX = 200;
var ESC_KEYCODE = 27;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;

var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
var pictureDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var getRandomComment = function() {
  var RandomCountComments = getRandomInt(1, 2);
  var pictureComments = [];
  var i = 1;
  while (i <= RandomCountComments) {
    pictureComments = pictureComments + getRandomValueFromArray(usersComments);
    i++;
  }
  return pictureComments;
}

var createPicture = function(picNum) {
  var pictures = [];
  for (var i = 0; i <= picNum - 1; i++) {
    var picture = {};
    picture.url = 'photos/' + (i + 1) + '.jpg';
    picture.likes = getRandomInt(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX);
    picture.comments = getRandomComment();
    picture.description = getRandomValueFromArray(pictureDescriptions);
    pictures.push(picture);
  }
  return pictures;
}

var pictures = createPicture(PICTURES_NUMBER);

var picturesContainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderSimilarPictures = function (picturesArray) {
  var similarPicturesElement = document.createDocumentFragment();
  for (var i = 0; i < picturesArray.length; i++) {
    similarPicturesElement.appendChild(renderPicture(picturesArray[i]));
  }
  picturesContainer.appendChild(similarPicturesElement);
};

renderSimilarPictures(pictures);

/*var renderBigPicture = function(picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
}

//renderBigPicture(pictures[0]);

var commentTemplate = document.querySelector('#comment').content;

function createDomComment(picture) {
  var commentElements = [];

  for (var i = 0; i < picture.comments.length; i++) {
    commentElements[i] = commentTemplate.cloneNode(true);

    commentElements[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    commentElements[i].insertAdjacentHTML('beforeend', picture.comments[i]);
  }

  return commentElements;
}

function renderComments(commentElements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < commentElements.length; i++) {
    fragment.appendChild(commentElements[i]);
  }

  return fragment;
}*/

/*var commentsBlock = bigPicture.querySelector('.social__comments');
commentsBlock.appendChild(renderComments(createDomComment(pictures[0])));

var commentscount = bigPicture.querySelector('.social__comment-count');
var commentsLoadMore = bigPicture.querySelector('.social__comment-loadmore');
commentscount.classList.add('visually-hidden');
commentsLoadMore.classList.add('visually-hidden');*/

//----------Загрузка изображения и показ формы редактирования-----

var uploadForm = document.querySelector('.img-upload__form');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var picEditionForm = uploadForm.querySelector('.img-upload__overlay');
var picEditionFormCloseBtn = picEditionForm.querySelector('.img-upload__cancel');

var onFormEditingEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFormEditing();
  }
}

var openFormEditing = function() {
  picEditionForm.classList.remove('hidden');
  document.addEventListener('keydown', onFormEditingEscPress);
}

var closeFormEditing = function() {
  picEditionForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormEditingEscPress);
  uploadFileInput.value = '';
}

uploadFileInput.addEventListener('change', function(evt) {
  openFormEditing();
});

picEditionFormCloseBtn.addEventListener('click', function() {
  closeFormEditing();
});

//----------Редактирование размера изображения--------

var picPreview = picEditionForm.querySelector('.img-upload__preview img');
var resizeValue = picEditionForm.querySelector('.resize__control--value');
var resizeDecreaseControl = picEditionForm.querySelector('.resize__control--minus');
var resizeIncreaseControl = picEditionForm.querySelector('.resize__control--plus');
var picScale = picEditionForm.querySelector('.scale');

var increaseSize = function() {
  var currentSize = parseInt(resizeValue.value, 10);
  if (currentSize < MAX_SCALE) {
    resizeValue.value = (currentSize + STEP_SCALE) + '%';
    currentSize = parseInt(resizeValue.value, 10);
    resizePic(currentSize);
  }
}

var decreaseSize = function() {
  var currentSize = parseInt(resizeValue.value, 10);
  if (currentSize > MIN_SCALE) {
    resizeValue.value = (currentSize - STEP_SCALE) + '%';
    currentSize = parseInt(resizeValue.value, 10);
    resizePic(currentSize);
  }
}

var resizePic = function(scaleImg) {
  if (scaleImg !== MAX_SCALE) {
    picPreview.style.transform = 'scale(0.' + scaleImg + ')';
  } else {
    picPreview.style.transform = 'none';
  }
}

resizeIncreaseControl.addEventListener('click', increaseSize);
resizeDecreaseControl.addEventListener('click', decreaseSize);

//----------Применение эффекта для изображения------

var effects = picEditionForm.querySelectorAll('.effects__radio');
var effectsList = picEditionForm.querySelector('.effects__list');
var effectNone = effectsList.querySelector('#effectNone');
var scaleLine = picScale.querySelector('.scale__line');
var scalePin = picScale.querySelector('.scale__pin');
var scaleLevel = picScale.querySelector('.scale__level');

var checkedEffect = '';
var defaultEffect = '';
var defaultEffectValue = 1;

var selectEffect = function () {
  for (var i = 0; i < effects.length; i++) {
    if (effects[i].checked) {
      checkedEffect = effects[i].value;
    }
  }
  return checkedEffect;
};

for (var i = 0; i < effects.length; i++) {
  effects[i].addEventListener('change', function () {
    selectEffect();
    addEffect(checkedEffect);
  });
}

var addEffect = function (selectedEffect) {
  for (i = 0; i < effects.length; i++) {
    if (picPreview.classList.contains('effects__preview--' + effects[i].value + '')) {
      picPreview.classList.remove('effects__preview--' + effects[i].value + '');
    }
  }
  picPreview.classList.add('effects__preview--' + selectedEffect + '');

  if (!selectedEffect) {
    picScale.classList.add('hidden');
  } else if (picScale.classList.contains('hidden')) {
    picScale.classList.remove('hidden');
  }
}

//----------Показ изображения в полноэкранном режиме-----

var bigPicture = document.querySelector('.big-picture');
var bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
var bigPictureOverlay = document.querySelector('.big-picture.overlay');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

var picLinks = document.querySelectorAll('.picture__link');

var renderBigPhoto = function (picture) {
  openBigPicture();
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
};

var onPhotoClick = function (evt) {
  renderBigPhoto(evt.target.parentNode);
};

for (i = 0; i < photos.length; i++) {
  photos[i].addEventListener('click', onPhotoClick);
}

bigPictureCloseBtn.addEventListener('click', closeBigPicture);
bigPictureOverlay.addEventListener('click', closeBigPicture);
