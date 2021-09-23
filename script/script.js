const sliderEl = document.querySelector('.swiper-container-js');
let mySwiper = new Swiper (sliderEl, {
  loop: true,
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