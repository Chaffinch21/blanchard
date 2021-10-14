const submenuBtn = document.querySelectorAll('.submenu-item__btn');
const hidemenu = document.querySelectorAll('.hidemenu-list');

hidemenu.forEach(menu => {
  document.addEventListener('click', (ev)=> {
    if (ev.target != menu && ev.target != menu.previousElementSibling){
      menu.parentElement.classList.remove('is-open');}
  
  }, true)
})

submenuBtn.forEach(toggle => {
  toggle.addEventListener('click', ()=> {
    toggle.parentElement.classList.toggle('is-open');
  })
})


// const sliderEl = document.querySelector('.swiper-container-js');
// let mySwiper = new Swiper (sliderEl, {
//   loop: true,
//   zoom: {
//     maxRatio: 5,
//   },
//   autoplay: {
//     delay: 4000,
//   },
//     spaceBetween: 1,
//     slidesPerView: 1.0,
//     centeredSlides: true,
//     effect: 'fade',

//     fadeEffect: {
//       crossFade: true
//     }
// });