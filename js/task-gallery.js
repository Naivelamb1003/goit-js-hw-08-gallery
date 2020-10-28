import galleryCard from "./gallery-items.js";

const imageHTML = createImageCardsMarkup(galleryCard);
const galleryContainer = document.querySelector('.js-gallery');
const openModal = document.querySelector('.lightbox');
const closeModal = document.querySelector('.lightbox__button');
const lighboxImage = document.querySelector('.lightbox__image');
const lighboxOverlay = document.querySelector('.lightbox__overlay');

galleryContainer.insertAdjacentHTML('beforeend', imageHTML);

galleryContainer.addEventListener('click', onGalleryContainerClick);
closeModal.addEventListener('click', onCloseButtonClick);
lighboxOverlay.addEventListener('click', onCloseButtonClick);


function createImageCardsMarkup(cards) {
    return cards 
    .map(({ preview, original, description }) => {
        return `
     <li class="gallery__item">
   <a class="gallery__link"
     href="${original}" >
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
     />
   </a>
 </li>
    `;
    })
        .join('');
};

function onGalleryContainerClick(evt) {
    window.addEventListener('keydown', onKeypress);
    evt.preventDefault();
    console.log(evt.target);

    lighboxImage.src = evt.target.getAttribute('data-source');
    openModal.classList.add('is-open');
        
};

function onCloseButtonClick() {
    openModal.classList.remove('is-open');
    lighboxImage.src = "";
    window.removeEventListener('keydown', onKeypress);
};

function onKeypress(evt) {
    evt.preventDefault();
    if (evt.code === 'Escape') {
      onCloseButtonClick();
          }
  if (evt.code === 'ArrowRight') {
    moveRight();
  }
  if (evt.code === 'ArrowLeft') {
    moveLeft();
  }
};

function moveRight() {
  let indexImage = 0;
  let imageSrc = lighboxImage.src;
  for (let i = 0; i < galleryCard.length; i += 1){
    if (imageSrc === galleryCard[i].original) {
    indexImage =  i;
      break;
    }

  }
  let  nextImageIndex = indexImage + 1;
  if (indexImage === galleryCard.length-1) {
    nextImageIndex = 0;
  }
  let nextImaget = galleryCard[nextImageIndex] ;
  lighboxImage.src = nextImaget.original;
  };

function moveLeft(){
  let indexImage = 0;
  let imageSrc = lighboxImage.src;
  for (let i = 0; i < galleryCard.length; i += 1){
    if (imageSrc === galleryCard[i].original) {
      indexImage = i;
      break;
    }
    }
     let  nextImageIndex = indexImage - 1;
  if (indexImage === 0) {
    nextImageIndex = galleryCard.length-1;
  }
  let nextImaget = galleryCard[nextImageIndex] ;
  lighboxImage.src = nextImaget.original;
};