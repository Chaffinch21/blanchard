const submenuBtn = document.querySelectorAll('.submenu-item__btn');
const hidemenu = document.querySelectorAll('.hidemenu-list');
const galleryModal = document.querySelector('.modal-js');
const modalCloseBtn = document.querySelector('.modal-close__js');
const galleryModalBlock = document.querySelector('.modal-gallery__js'); 
const catalogList = document.querySelector('.swiper-gallery__wrapper');
const catalogBtns = document.querySelector('#selectCustom');
const galleryPagination = document.querySelector('.swiper-pagination');
const galleryNav = document.querySelector('.gallery-slider__nav');
const catalogDescr = document.querySelector('.catalog-descr');
const cauntryBtns = document.querySelectorAll('.country-btn');
const hronoList = document.querySelectorAll('.accordion-painterlist');
const hronoItem = document.querySelectorAll('.accordion-hronoitem');
const accordionBtns = document.querySelectorAll('.accordion-hronoitem__btn');
const eventsBtn = document.querySelector('.events-btn');
const eventsList = document.querySelector('.events-list');
const catalogPainter = document.querySelector('.catalog-painter');
const editionsSlider = document.querySelector('.swiper-editions__wrapper');
const editionsPagination = document.querySelector('.swiperEd-pagination');
const editionsNav = document.querySelector('.editions-slider__nav');
const editionsCheck = document.querySelectorAll('.check__input');


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
      let count = 0;
      for (item of data) {
        
        if (item.art == art) {
          count += 1;
          catalogList.innerHTML += `
            <div class="swiper-slide gallery-slide">
              <button class="btn gallery-slide__btn gallery-btn__js" data-id="${item.id}" type="button">
                <img class="gallery-slide__img" src="${item.cover}" alt="${item.title}">
              </button>
            </div>
          `;
        }

        if (count>9){
          galleryNav.classList.add('visible');
        } else {galleryNav.classList.remove('visible')};
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
      collapsible: true,
      active: 0,
      refresh: true,
      animate: 300,
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
          $( ".accordion" ).accordion("refresh");
        }
      });
  };

  const loadPainter = (paint) => {
    catalogPainter.innerHTML = '';
    fetch('data/painter.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
   
        for (man of data){
          let countryPainter = man.country;
           if(document.querySelector(`.accordion-hronoitem__btn[aria-expanded="true"]`).nextElementSibling.firstElementChild.classList.contains('accordion-empty')){
            catalogPainter.innerHTML = `
              <img class="painter-img" src="/img/no-painter.jpg" alt="художник отсутствует">
              <h3 class="painter-name">Что мы о нём знаем?</h3>
              <p class="painter-descr">Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!</p>
              <a href="#gallery" class="accordion-empty__link">В галерею</a>
              `;
              return; 
           }
          if (paint == countryPainter) {
            catalogPainter.innerHTML = `
              <img class="painter-img" src="${man.img}" alt="${man.painter}">
              <h3 class="painter-name">${man.painter}</h3>
              <span class="painter-year">${man.years}</span>
              <p class="painter-descr">${man.descr}</p>
            `;
           
              document.querySelector(`.accordion-painteritem__btn[data-painter = "${man.painter}"]`).classList.add('active');
              return;            
          }
          if (man.painter == paint){
            catalogPainter.innerHTML = `
              <img class="painter-img" src="${man.img}" alt="${man.painter}">
              <h3 class="painter-name">${man.painter}</h3>
              <span class="painter-year">${man.years}</span>
              <p class="painter-descr">${man.descr}</p>
            `;
            document.querySelector(`.accordion-painteritem__btn[data-painter = "${man.painter}"]`).classList.add('active');
          } 
        }
      });
  };

  const loadAccordion = (countryActive, yearActive) => {
    fetch('data/painter.json')
    .then((response) => {
      return response.json();
    })
    .then((painters) => {
      for (man of painters) {
        if ((man.country == countryActive) &&(man.year == yearActive)){
          document.querySelector(`.accordion-hronoitem__btn[data-year="${yearActive}"]`).nextElementSibling.innerHTML += `
          <li class="accordion-painteritem">
            <button class="btn accordion-painteritem__btn" type="button" data-painter = "${man.painter}">${man.painter}</button>
          </li>
          `;
        }
        const painterItemBtns = document.querySelectorAll('.accordion-painteritem__btn');
        
        painterItemBtns.forEach(el=>{
          
          el.addEventListener('click', function(){
            catalogPainter.innerHTML = '';
            painterItemBtns.forEach(elem=>{
              elem.classList.remove('active');
            });
            loadPainter(el.textContent);
          })
        })
      }
      if (document.querySelector(`.accordion-hronoitem__btn[data-year="${yearActive}"]`).nextElementSibling.childElementCount == ''){
        document.querySelector(`.accordion-hronoitem__btn[data-year="${yearActive}"]`).nextElementSibling.innerHTML += `
          <li class="accordion-painteritem accordion-empty">
            <div class="accordion-empty__img"></div>
            <div class="accordion-empty__content">
              <h3 class="accordion-empty__title">Здесь пока пусто</h3>
              <p class="accordion-empty__text">А в галерее вы всегда можете найти что-то интересное для себя</p>
              <a href="#gallery" class="accordion-empty__link">В галерею</a>
            </div>
          </li>
          `;
      }
      $( ".accordion" ).accordion("refresh");
    })
  };

  
  
  loadCatalog('italy');
  loadAccordion('italy', 14);
  loadPainter('italy');
  // painterItemBtns[0].classList.add('active');

  accordionBtns.forEach(el => {
    el.addEventListener('click', function(ev){
    ev.currentTarget.nextElementSibling.innerHTML = '';
    const year = ev.currentTarget.dataset.year;
    const countryActive = document.querySelector('.country-btn--active').dataset.country;
    loadAccordion(countryActive, year);
    })
  })
  
  cauntryBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      const country = e.currentTarget.dataset.country;
      cauntryBtns.forEach(el => { el.classList.remove('country-btn--active'); });

      e.currentTarget.classList.add('country-btn--active');
      loadCatalog(country);
      
      $( ".accordion" ).accordion("refresh");
       $( ".accordion" ).accordion( "option", "active", 0 );
       loadAccordion(country, 14);
       loadPainter(country);
      hronoList.forEach(el =>{
        el.innerHTML='';
      })
    });
  })

  //события
  eventsBtn.addEventListener('click', function(ev){
    ev.preventDefault();
    eventsList.classList.toggle('is-open');
    if(eventsList.classList.contains('is-open')){
      eventsBtn.textContent = 'Свернуть'
    }
    if(!eventsList.classList.contains('is-open')){
      eventsBtn.textContent = 'Все события'
    }
  })

  //editions

  let swiperEditions = new Swiper('.editions-slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 50,
    pagination: {
      el: '.swiperEd-pagination',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.swiperEd-button-next',
      prevEl: '.swiperEd-button-prev',
      disabledClass: 'swiperEd-button-disabled'
    },
  });

 

  const loadEditions = (checkArr) => {
    editionsPagination.innerHTML = '';
    editionsSlider.innerHTML = '';
       fetch('data/editions.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let count = 0;
        for (item of data) {
          let categoryArr = item.category;
          console.log(checkArr);
          if (checkArr.length == 0) {

            editionsSlider.innerHTML='';
          } else {
            checkArr.forEach(check => {
              categoryArr.forEach(cat => {
                if (check === cat) {
                  count += 1;
                  editionsSlider.innerHTML += `
                  <div class="swiper-slide editions-card" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="editions-card__img">
                    <div class="editions-card__top">
                      <h4 class="editions-card__title">${item.name}</h4>
                      <span class="editions-card__price">${item.price} руб</span>
                    </div>
                    <span class="editions-card__autor">${item.author}</span>
                    <button class="btn editions-card__btn">Заказать</button>
                  </div>
                  `;
                } return;
              });
            });
          }
          
  
          if (count>3){
            editionsNav.classList.add('visible');} 
          else {editionsNav.classList.remove('visible')};

          swiperEditions.update();
        }
      
          let checkArray = new Array();
          editionsCheck.forEach(check => {  
            check.addEventListener('change', function(e){
              e.target.classList.toggle('checked');
              
                if (e.target.checked){
                  checkArray.push(e.target.value);
                } else {
                  
                  let i = checkArray.indexOf(check.value, 0);
                  checkArray.splice(i,1);
                }
                    
              loadEditions(checkArray);
            });
      });
    })
  }   
  

  loadEditions(['all']);


  document.querySelectorAll('.editions-price__input').forEach(
    el=>{
      el.addEventListener('mousedown', function(){
        this.style.background = '#7943A4';
      })
      el.addEventListener('change', function(){
        this.style.background = 'rgba(157, 92, 208, 0.5)';
      })
    }
  ) 

  let inputNumber = document.querySelectorAll("input[type='text']");
  let im = new Inputmask("999 999", {numericInput: true, "placeholder": "", rightAlign: false});
  inputNumber.forEach(el=>{
    im.mask(el);
  })
  

