const submenuBtn = document.querySelectorAll('.submenu-item__btn');
const hidemenu = document.querySelectorAll('.hidemenu-list');
const galleryModal = document.querySelector('.modal-js');
const modalCloseBtn = document.querySelector('.modal-close__js');
const galleryModalBlock = document.querySelector('.modal-gallery__js'); 
const catalogList = document.querySelector('.swiper-wrapper');
const catalogBtns = document.querySelector('#selectCustom');
const galleryPagination = document.querySelector('.swiper-pagination');


//открытие и закрытие подменю
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


// кастомный селект
const selectEl = document.querySelector('#selectCustom');
const choices = new Choices(selectEl, {
  searchEnabled: false,
  shouldSort: false,
  duplicateItemsAllowed: false,
  renderChoiceLimit: 3,
  renderSelectedChoices: false,
})

// const containerOuter = document.querySelector('.choise')
// containerOuter.addEventListener('showDropdown', function(){
//   console.log(1)
// })


// слайдер галерея
let swiperGallery = new Swiper(".mySwiper", {
  loop: false,
  watchSlidesProgress: true,
  speed: 1000,
  slidesPerView: 'auto',
  slidesPerColumn: 2,
  slidesPerGroup: 3,
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination",
    type: 'fraction',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const loadGallery = (art) => {
  catalogList.innerHTML = '';
  galleryPagination.innerHTML = '';
  galleryModalBlock.innerHTML = '';
  fetch('data/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (item of data) {
        
        if (item.art == art) {
          catalogList.innerHTML += `
            <div class="swiper-slide gallery-slide">
              <button class="btn gallery-slide__btn gallery-btn__js" data-id="${item.id}" type="button">
                <img class="gallery-slide__img" src="${item.cover}" alt="${item.title}">
              </button>
            </div>
          `;
        }
        swiperGallery.update();
        const galleryBtn = document.querySelectorAll('.gallery-btn__js');
        console.log(galleryBtn);

        const loadModal = (id) =>{
    
          galleryModal.classList.add('visible');
        
          fetch('data/data.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            for (item of data) {
              if (item.id == id) {
        
                galleryModalBlock.innerHTML = `
                <img src="${item.big}" alt="${item.title}" class="modal-gallery__img">
                <div class="modal-gallery__descr modal-descr">
                  <h3 class="modal-descr__autor">${item.author}</h3>
                  <h4 class="modal-descr__title">${item.title}</h4>
                  <span class="modal-descr__year">${item.year}</span>
                  <p class="modal-descr__text" data-simplebar>${item.descr}</p>
                </div>
                <button type="button" class="btn modal-gallery__btn modal-close__js" aria-label="закрыть модальное окно"></button>
                `;
              }
            }    
          })
        };

        galleryBtn.forEach(btn => {
          btn.addEventListener('click', function(e){
            const id = e.currentTarget.dataset.id;
            console.log(id);
            loadModal(id);
          });
        })
        
        galleryModal.addEventListener('click',(ev)=>{
          if((ev.target === modalCloseBtn) || (ev.target != galleryModalBlock)) {
            galleryModal.classList.remove('visible')
          }
        });
      }
    });
};

loadGallery('painting');


catalogBtns.addEventListener('change', (e) => {
    const art = e.currentTarget.value;
    loadGallery(art);
  });