// main.js
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreBtn = document.querySelector('#load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

async function fetchImages(query, page) {
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits.length) {
      iziToast.warning({
        title: 'Attention',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Information',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    if (page > 1) {
      const gallery = document.querySelector('.gallery');
      const cardHeight =
        gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load data',
    });
  } finally {
    hideLoader(); // гарантоване приховування лоадера
  }
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Enter your search query' });
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    totalHits = 0;
    clearGallery();
    hideLoadMoreButton();
  }

  fetchImages(currentQuery, currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchImages(currentQuery, currentPage);
});
