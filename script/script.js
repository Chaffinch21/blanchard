const sliderEl = document.querySelector('.swiper-container-js');
let mySwiper = new Swiper (sliderEl, {
  loop: true,
  zoom: {
    maxRatio: 5,
  },
  autoplay: {
    delay: 4000,
  },
    spaceBetween: 1,
    slidesPerView: 1.0,
    centeredSlides: true,
    effect: 'fade',

    fadeEffect: {
      crossFade: true
    }
});

const selectEl = document.querySelector('.selectCustom');
const choices = new Choices(selectEl, {
  searchEnabled: false,
  shouldSort: false,
  duplicateItemsAllowed: false,
    searchChoices: false,
  // itemSelectText : ''
})
const choicesDropdawn = document.querySelector('.choices__list--dropdown');
const simpleBar = new SimpleBar(choicesDropdawn);

choicesDropdawn.addEventListener('click', function(){
    simpleBar.recalculate();
})