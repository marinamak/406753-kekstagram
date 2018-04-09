'use strict';

PICTURES_NUMBER = 25;
LIKES_NUMBER_MIN = 15;
LIKES_NUMBER_MAX = 200;

var usersComments = [
  Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
]
var pictureDescriptions = [
  Тестим новую камеру!
  Затусили с друзьями на море
  Как же круто тут кормят
  Отдыхаем...
  Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......
  Вот это тачка!
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomIndex(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

var getRandomComment = function(){
  var RandomCountComments = getRandomInt(1, 2);
  var pictureComments = [];
  var numberComment = 0;
  var i = 1;
  while (i <= RandomCountComments) {
    numberComment = getRandomIndex(usersComments);
    pictureComments += usersComments[numberComment];
    i++;
  }
  return pictureComments;
}

var createPicture = function() {
  var pictures = [];
  for (var i = 0; i <= PICTURES_NUMBER - 1; i++) {
    var picture = {};
    pictures.url = 'photos/' + (i++) + '.jpg';
    pictures.likes = getRandomInt(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX);
    pictures.comments = getRandomComment();
    pictures.description = getRandomIndex(pictureDescriptions);
    pictures.push(picture);
  }
  return pictures;
}

var pictures = createPicture();

