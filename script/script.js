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
const editionsAccordionBtn = document.querySelector('.editions-subtitle');
const editionsPagination = document.querySelector('.swiperEd-pagination');
const editionsNav = document.querySelector('.editions-slider__nav');
const editionsCheck = document.querySelectorAll('.check__input');
const burgerBtn = document.querySelector('.header-burger-js');
const mediaMenu = document.querySelector('.media-menu');
const mediaMenuBtn = document.querySelector('.media-menu__btn');
const mediaMenuLink = document.querySelectorAll('.media-nav__link');
const mediaSerch = document.querySelector('.media-search__submit');
const mediaSerchClose = document.querySelector('.media-search__close');
const mediaField = document.querySelector('.media-search__field');
const logo = document.querySelector('.logo');


//бургер-меню
burgerBtn.addEventListener('click', function(ev){
  document.querySelector('.body').classList.toggle('burger-open');
})

//мобильное меню
  let heightHero = document.querySelector('.hero').offsetHeight;
  let heightHeader = document.querySelector('.header').offsetHeight;
  let heightMediaMenu = heightHero + heightHeader
  mediaMenu.style.height = heightMediaMenu + 'px';
window.addEventListener("resize", function(){
  heightHero = document.querySelector('.hero').offsetHeight;
  heightHeader = document.querySelector('.header').offsetHeight;
  heightMediaMenu = heightHero + heightHeader
  mediaMenu.style.height = heightMediaMenu + 'px';
});

mediaMenuLink.forEach(el=>{
  el.addEventListener('click', function(){
    document.querySelector('.body').classList.remove('burger-open');
  })
})


//поиск
mediaSerch.addEventListener('click', function(){
 
    logo.classList.add('hidden');
    burgerBtn.classList.add('hidden');
    mediaField.classList.add('open');
    mediaSerchClose.style.display = 'block';
  if (document.documentElement.clientWidth<701){
    document.querySelector('.header-menu__container').style.height = '75px';
    document.querySelector('.media-search').style.marginBottom = '-15px';
  }
})

mediaSerchClose.addEventListener('click', function(){
  setTimeout(function(){logo.classList.remove('hidden')}, 500);
  setTimeout(function(){burgerBtn.classList.remove('hidden')}, 500);
    mediaField.classList.remove('open');
    mediaSerchClose.style.display = 'none';
    if (document.documentElement.clientWidth<701){
      document.querySelector('.header-menu__container').style.height = '45px';
      document.querySelector('.media-search').style.marginBottom = '0px';
    }
})



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
let swiperGallery = new Swiper(".gallery-slider", {
  loop: false,
  watchSlidesProgress: true,
  speed: 1000,
  slidesPerView: 'auto',
  slidesPerColumn: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    type: 'fraction',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints:{
    320:{
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerGroup: 1,
      spaceBetween: 90
    },
    500:{
      slidesPerView: 2,
      slidesPerColumn: 1,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    700:{
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1024:{
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      },

    1301:{
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerColumn: 2,
      slidesPerGroup: 1,
    }
  }
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
        
        if ((item.art == art) && (document.documentElement.clientWidth>960)) {
          count += 1;
          catalogList.innerHTML += `
            <div class="swiper-slide gallery-slide">
              <button class="btn gallery-slide__btn gallery-btn__js" data-id="${item.id}" type="button">
                <img class="gallery-slide__img" src="${item.cover}" alt="${item.title}">
              </button>
            </div>
          `;
        }

        if ((item.art == art) && (document.documentElement.clientWidth<=960) && (document.documentElement.clientWidth>700)) {
          count += 1;
          catalogList.innerHTML += `
            <div class="swiper-slide gallery-slide">
              <button class="btn gallery-slide__btn gallery-btn__js" data-id="${item.id}" type="button">
                <img class="gallery-slide__img" src="${item.medium}" alt="${item.title}">
              </button>
            </div>
          `;
        }

        if ((item.art == art) && (document.documentElement.clientWidth<=700)) {
          count += 1;
          catalogList.innerHTML += `
            <div class="swiper-slide gallery-slide">
              <button class="btn gallery-slide__btn gallery-btn__js" data-id="${item.id}" type="button">
                <img class="gallery-slide__img" src="${item.mobil}" alt="${item.title}">
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
                <div class="modal-gallery__image">
                  <img src="${item.big}" alt="${item.title}" class="modal-gallery__img">
                </div>
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


  window.addEventListener('resize', function(){
    const art = catalogBtns.currentTarget.value;
    loadGallery(art);
  
  });






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
      animate: {
        duration: 1000
    }
    });
  })

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
          if ((paint == countryPainter) || (man.painter == paint)) {
            catalogPainter.innerHTML = `
              <img class="painter-img" src="${man.img}" alt="${man.painter}">
              <h3 class="painter-name">${man.painter}</h3>
              <span class="painter-year">${man.years}</span>
              <p class="painter-descr">${man.descr}</p>
            `;
           
              document.querySelector(`.accordion-painteritem__btn[data-painter = "${man.painter}"]`).classList.add('active');
              return;            
          }
          // if (man.painter == paint){
          //   catalogPainter.innerHTML = `
          //     <img class="painter-img" src="${man.img}" alt="${man.painter}">
          //     <h3 class="painter-name">${man.painter}</h3>
          //     <span class="painter-year">${man.years}</span>
          //     <p class="painter-descr">${man.descr}</p>
          //   `;
          //   document.querySelector(`.accordion-painteritem__btn[data-painter = "${man.painter}"]`).classList.add('active');
          // } 
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
    })
  };

  // document.addEventListener("DOMContentLoaded", () => {
  //   cauntryBtns.forEach(country =>{
  //     hronoItem.forEach(el =>{
  //       loadAccordion(country, el.firstChild.data-year)
  //     })
  //   })
    
  // });
  
  loadCatalog('italy');
  $( ".accordion" ).on( "accordioncreate", loadAccordion('italy', 14));
  loadPainter('italy');

  accordionBtns.forEach(el => {
    el.addEventListener('click', function(ev){
    ev.currentTarget.nextElementSibling.innerHTML = '';
    const year = ev.currentTarget.dataset.year;
    const countryActive = document.querySelector('.country-btn--active').dataset.country;
    $( ".accordion" ).on( "accordioncreate", loadAccordion(countryActive, year));
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

  //event

  const eventsSlider = document.querySelector('.events-swiper__container');

  let swiperEvent;

  const mobileEventsSlider = () => {
    if (window.innerWidth <= 600 && eventsSlider.dataset.mobile == 'false') {
      document.querySelector('.events-swiper__container').classList.add('swiper-container');
      document.querySelector('.events-list').classList.add('swiper-wrapper');
      document.querySelectorAll('.events-item').forEach(el => {
        el.classList.add('swiper-slide')
      })
      swiperEvent = new Swiper(eventsSlider, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        loop: false,
        // slideClass: ('events-item'),

        pagination: {
          el: '.swiperEv-pagination',
          clickable: true
        },
      });

      eventsSlider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 601) {
      eventsSlider.dataset.mobile = 'false';

        if (eventsSlider.classList.contains('swiper-container-initialized')) {
          swiperEvent.destroy();
        }
    }
  }

  mobileEventsSlider();

  window.addEventListener('resize', () => {
    mobileEventsSlider();
  });


  //editions

  const editionSlider = document.querySelector('.editions-slider');

  let swiperEditions;

  const bigEditionsSlider = () => {
    if (window.innerWidth > 700 && editionSlider.dataset.big == 'true') {
      swiperEditions = new Swiper(editionSlider, {
        loop: false,
    
        pagination: {
          el: '.swiperEd-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiperEd-button-next',
          prevEl: '.swiperEd-button-prev',
          disabledClass: 'swiperEd-button-disabled'
        },
        breakpoints:{
          600:{
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 38,
          },
          900:{
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 50,
          },
      
          1300:{
            spaceBetween: 50,
            slidesPerView: 3,
            slidesPerGroup: 1,
            }
        }
      });

      editionSlider.dataset.big = 'false';
    }

    if (window.innerWidth < 701) {
      editionSlider.dataset.big = 'true';

        if (editionSlider.classList.contains('swiper-container-initialized')) {
          swiperEditions.destroy();
        }
    }
  }

  bigEditionsSlider();

  window.addEventListener('resize', () => {
    bigEditionsSlider();
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
          
          if (window.innerWidth > 700){
            swiperEditions.update();
          }
          
        }
      
      //     let checkArray = new Array();
      //     editionsCheck.forEach(check => {  
      //       check.addEventListener('change', function(e){
      //         e.target.classList.toggle('checked');
              
      //           if (e.target.checked){
      //             checkArray.push(e.target.value);
      //           } else {
                  
      //             let i = checkArray.indexOf(check.value, 0);
      //             checkArray.splice(i,1);
      //           }
                    
      //         loadEditions(checkArray);
      //       });
      // });
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


  const editionsAccordion = document.querySelector('.accordion-editions');

  const mobileEditionsAccordion = () => {
    if (window.innerWidth <= 700 && editionsAccordion.dataset.mobile == 'false') {
      editionsAccordion.dataset.mobile == 'true';
      editionsAccordionBtn.classList.add('open');
      document.querySelectorAll('.check__delete').forEach(el=>{
        el.style.display = 'none';
      })
      editionsAccordionBtn.addEventListener("click", function(){
        
        if (editionsAccordionBtn.dataset.open == 'false') {
          document.querySelectorAll('.check__input').forEach(el=>{
              el.parentElement.parentElement.style.display = 'flex';
              el.parentElement.nextElementSibling.style.display = 'none'; 
          })
          editionsAccordionBtn.dataset.open = 'true';
        } 
        
       else {
        editionsAccordionBtn.classList.remove('open');
          document.querySelectorAll('.check__input').forEach(el=>{
            if (el.checked) {
              el.parentElement.nextElementSibling.style.display = 'inline-block';
              document.querySelectorAll('.check__delete').forEach(btn=>{
                btn.addEventListener('click', function(ev){
                  ev.preventDefault();
                  ev.target.parentElement.style.display = 'none';
                  ev.target.previousElementSibling.firstElementChild.checked = false;
                })
              })
            }
            if(!el.checked) {
              el.parentElement.parentElement.style.display = 'none';
            }          
          }) 
          editionsAccordionBtn.dataset.open = 'false';
        }
      })
      
    }

    if (window.innerWidth > 701) {
      editionsAccordion.dataset.mobile = 'false';
      document.querySelectorAll('.checkbox-item').forEach(el=>{
        console.log(1);
        el.style.display = "block";
      })
      loadEditions(['all']);
    }
  }

  mobileEditionsAccordion();

  window.addEventListener('resize', () => {
    mobileEditionsAccordion();
  });

  //Маска и валидация для инпутов

  let inputNumber = document.querySelectorAll(".editions-price__input");
  let im = new Inputmask("999 999", {numericInput: true, "placeholder": "", rightAlign: false});
  inputNumber.forEach(el=>{
    im.mask(el);
  })

  let inputTel = document.querySelector("input[type='tel']");
  let maskTel = new Inputmask("+7 (999)-999-99-99");
  maskTel.mask(inputTel);

  new JustValidate('.contact-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = inputTel.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      }
    },
    messages: {
      name:'Недопустимый формат',
      tel: 'Укажите ваш телефон'
    }
  })

  
  //Всплывающие подсказки

  tippy('#tooltip--one', {
    content: "Пример современных тенденций - современная методология разработки",
    theme: 'fialca',
    placement: 'top',
    trigger: 'click'
  });

  tippy('#tooltip--two', {
    content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции  ",
    theme: 'fialca',
    placement: 'top',
    trigger: 'click'
  });

  tippy('#tooltip--three', {
    content: "В стремлении повысить качество",
    theme: 'fialca',
    placement: 'top',
    trigger: 'click'
  });

  // проекты слайдер
  let swiperProject = new Swiper('.project-swiper__container', {
    loop: false,
    slideClass: ('project-partners'),
    slidesPerView: 1,
    slidesPerGroup: 1,
    centerSlides: true,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiperPr-button-next',
      prevEl: '.swiperPr-button-prev',
      disabledClass: 'swiperPr-button-disabled',
      // watchSlidesVisibility: true
    },
    breakpoints:{
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      550: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 50,
      },
      1540:{
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 50,
        }
      
    }
  });

  //карта 
  ymaps.ready(init);
    function init(){

       let myMap = new ymaps.Map("map", {
            
          center: [55.75846806898367,37.60108849999989],
          zoom: 15,
          controls: []
        });

        let geoControl = new ymaps.control.GeolocationControl({
          options: {
            float: 'none',
            position: {
                right: 20,
                top: 360
           }
          }
        })

        myMap.controls.add(geoControl);
      

        let zoomControl = new ymaps.control.ZoomControl({
          options: {
            float: 'none',
            position: {
                right: 20,
                top: 160
           },
              size: 'small'
          }
        })

        myMap.controls.add(zoomControl);
    
  
      let myPlacemark = new ymaps.Placemark([55.75846806898367,37.60108849999989], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/placemark.png',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -7]
    });
      
      myMap.geoObjects.add(myPlacemark); 
      }

      // изменение размеров экрана
 
      if(window.innerWidth<700){
        document.querySelector('.defis').textContent = document.querySelector('.defis').textContent.replace( '\u{2011}', '-');
      }

      window.addEventListener('resize', () => {
        if(window.innerWidth<=700){
          document.querySelector('.defis').textContent = document.querySelector('.defis').textContent.replace( '\u{2011}', '-');
        }
        else{
          document.querySelector('.defis').textContent = document.querySelector('.defis').textContent.replace( '-', '\u{2011}');
        }
      });
    