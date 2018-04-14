'use strict';

var PICTURES_NUMBER = 25;
var LIKES_NUMBER_MIN = 15;
var LIKES_NUMBER_MAX = 200;

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

function getRandomValueFromArray(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

var getRandomComment = function(){
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

var renderBigPicture = function(picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
}

renderBigPicture(pictures[0]);

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
}

var commentsBlock = bigPicture.querySelector('.social__comments');
commentsBlock.appendChild(renderComments(createDomComment(pictures[0])));

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
