import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.getElementById('loader');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <div class='gallery-img'>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
      </div>
        <div class="info">
          <div class="info-text"><p><b>Likes:</b> <span class="info-count">${likes}</ы></span></div>
          <div class="info-text"><p ><b>Views:</b> <span class="info-count">${views}</ы></span></div>
          <div class="info-text"><p><b>Comments:</b> <span class="info-count">${comments}</ы></span></div>
          <div class="info-text"><p><b>Downloads:</b> <span class="info-count">${downloads}</ы></span></div>
        </div>
      </li>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const galleryItems = document.querySelectorAll('.gallery li');
galleryItems.forEach((item, index) => {
  if (index >= 9) item.style.display = 'none';
});

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  const btn = document.querySelector('#load-more-btn');
  btn.style.display = 'block';
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('#load-more-btn');
  btn.style.display = 'none';
}
