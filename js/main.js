import gallery from "./gallery-items.js";

//ref
const ref = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxImg: document.querySelector('.lightbox__image'),
}
let imgIndex = 0;

//functions
function createListItem(preview, original, description) { 
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
  
  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.setAttribute('href', original);
  
  const galleryImg = document.createElement('img');
  galleryImg.classList.add('gallery__image');
  galleryImg.setAttribute('src', preview);
  galleryImg.setAttribute('alt', description);
  galleryImg.setAttribute('data-source', original);
  galleryImg.setAttribute('data-index', imgIndex);
  imgIndex += 1;

  galleryLink.append(galleryImg);
  galleryItem.append(galleryLink);
  
  return galleryItem;
}

function openLightbox(event){ 
  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') { 
    return;
  }

  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onRightPress);
  window.addEventListener('keydown', onLeftPress);
  
  ref.lightbox.classList.add('is-open');
  ref.lightboxImg.setAttribute('src', event.target.dataset.source);
  ref.lightboxImg.setAttribute('index', event.target.dataset.index);
}

function closeLightbox() { 
  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onRightPress);
  window.removeEventListener('keydown', onLeftPress);
  
  ref.lightbox.classList.remove('is-open');
  ref.lightboxImg.removeAttribute('src');
}

function onOverlayClick(event) { 
  if (event.target === event.currentTarget)
  closeLightbox();
}

function onEscPress(event) { 
  if (event.code === 'Escape') { 
    closeLightbox();
  }
}

function onRightPress(event) {
  if (event.code === 'ArrowRight') { 
    const currentIndex = Number(ref.lightboxImg.getAttribute('index'));
    ref.lightboxImg.removeAttribute('src');

    if (currentIndex === gallery.length - 1) { 
      ref.lightboxImg.setAttribute('src', gallery[0].original);
      ref.lightboxImg.setAttribute('index', '0');
      return;
    }
    
    ref.lightboxImg.setAttribute('src', gallery[currentIndex + 1].original);
    ref.lightboxImg.setAttribute('index', currentIndex + 1);
  }
 }

function onLeftPress(event) {
  if (event.code === 'ArrowLeft') { 
    const currentIndex = Number(ref.lightboxImg.getAttribute('index'));
    ref.lightboxImg.removeAttribute('src');

    if (currentIndex === 0) { 
      ref.lightboxImg.setAttribute('src', gallery[gallery.length-1].original);
      ref.lightboxImg.setAttribute('index', gallery.length-1);
      return;
    }
    
    ref.lightboxImg.setAttribute('src', gallery[currentIndex - 1].original);
    ref.lightboxImg.setAttribute('index', currentIndex - 1);
  }
 }

gallery.forEach((picture) => {
  const { preview, original, description } = picture;
  ref.galleryList.append(createListItem(preview, original, description));
});

ref.galleryList.addEventListener('click', openLightbox);
ref.lightboxBtn.addEventListener('click', closeLightbox);
ref.lightboxOverlay.addEventListener('click', onOverlayClick);


