import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { smoothScroll } from './smoothscroll';
import { createOneCardImage } from './createcard';

const API_KEY = '35639448-d856c19f58ebd88d37f926e40';
const perPage = 40;
let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadButton.addEventListener('click', onSubmitButtonClick);

refs.loadButton.classList.add('is-hidden');

function onSubmitButtonClick(evt) {
  evt.preventDefault();
  if (evt.currentTarget.id === 'search-form') {
    page = 1;
    refs.gallery.innerHTML = '';
  }
  const searchQuery = refs.input.value;
  if (searchQuery.trim() === '') {
    return;
  } else {
    getPictures(searchQuery).then(response => {
      if (response.data.hits.length === 0) {
        refs.loadButton.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (page * perPage > response.data.totalHits) {
        refs.loadButton.classList.add('is-hidden');
        Notiflix.Notify.info(
          'Were sorry, but youve reached the end of search results.'
        );
      } else if (page === 1) {
        refs.loadButton.classList.remove('is-hidden');
        Notiflix.Notify.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );
      }

      const pictures = response.data.hits;
      const oneItem = pictures
        .map(picture => createOneCardImage(picture))
        .join('');
      refs.gallery.insertAdjacentHTML('beforeend', oneItem);
      let lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      page += 1;

      if (page > 2) {
        smoothScroll();
      }
    });
  }
}

async function getPictures(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
