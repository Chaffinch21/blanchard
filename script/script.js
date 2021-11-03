const submenuBtn = document.querySelectorAll('.submenu-item__btn');
const hidemenu = document.querySelectorAll('.hidemenu-list');
const galleryModal = document.querySelector('.modal-js');
const modalCloseBtn = document.querySelector('.modal-close__js');
const galleryModalBlock = document.querySelector('.modal-gallery__js'); 
const catalogList = document.querySelector('.swiper-wrapper');
const catalogBtns = document.querySelector('#selectCustom');
const galleryPagination = document.querySelector('.swiper-pagination');
const catalogDescr = document.querySelector('.catalog-descr');
const cauntryBtns = document.querySelectorAll('.country-btn');
const hronoList = document.querySelectorAll('.accordion-painterlist');
const hronoItem = document.querySelectorAll('.accordion-hronoitem');
const accordionBtns = document.querySelectorAll('.accordion-hronoitem__btn');


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

// Галерея загрузка

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

  // Каталог

  $( function() {
    $( ".accordion" ).accordion({
      heightStyle: "content",
      refresh: true,
      active: false,
      animate: 300,
      collapsible: true,
    });
  })

  // setTimeout('$(".accordion").accordion({heightStyle: "content", refresh: true, collapsible: true, active: 1,})', 1000);

  const loadCatalog = (country) => {
    catalogDescr.innerHTML = '';
    fetch('data/country.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (item of data) {
          
          if (item.country == country) {
            catalogDescr.innerHTML = `${item.text}`;                    
          }

        }
      });
  };

  loadCatalog('italy');
  console.log(accordionBtns);
    fetch('data/painter.json')
    .then((response) => {
      return response.json();
    })
    .then((painters) => {
        accordionBtns.forEach(el => {
            el.addEventListener('click', function(ev){
              ev.currentTarget.nextElementSibling.innerHTML = '';
              for (man of painters) {
                const countryActive = document.querySelector('.country-btn--active').dataset.country;
                const year = ev.currentTarget.dataset.year;
                if ((man.country == countryActive) &&(man.year == year)){
                  ev.currentTarget.nextElementSibling.innerHTML += `
                  <li class="accordion-painteritem">
                    <button class="btn accordion-painteritem__btn" type="button" data-painter = "${man.painter}">${man.painter}</button>
                  </li>
                  `;
                }
                const painterItemBtns = document.querySelectorAll('.accordion-painteritem__btn');
                const catalogPainter = document.querySelector('.catalog-painter');
                painterItemBtns.forEach(el=>{
                  
                  el.addEventListener('click', function(){
                    catalogPainter.innerHTML = '';
                    console.log(man.painter);
                    for (man of painters){
                      if (man.painter == el.textContent){
                        catalogPainter.innerHTML = `
                          <img class="painter-img" src="${man.img}" alt="${man.painter}">
                          <h3 class="painter-name">${man.painter}</h3>
                          <span class="painter-year">${man.years}</span>
                          <p class="painter-descr">${man.descr}</p>
                        `;
                      }
                    }
                    
                  })
                })
              }   
                
              })
          })
     
      }); 
  
  cauntryBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      const country = e.currentTarget.dataset.country;
      cauntryBtns.forEach(el => { el.classList.remove('country-btn--active'); });

      e.currentTarget.classList.add('country-btn--active');
      loadCatalog(country);
      $( ".accordion" ).accordion("refresh");
       $( ".accordion" ).accordion( "option", "activate", false );
      hronoList.forEach(el =>{
        el.innerHTML='';
      })
    });
  })