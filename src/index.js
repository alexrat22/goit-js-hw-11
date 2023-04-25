import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './js/getpictures';
import { createOneCardImage } from './js/createcard';
import { smoothScroll } from './js/smoothscroll';

const perPage = 40;
export let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadButton.addEventListener('click', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
  evt.preventDefault();
  if (evt.currentTarget.id === 'search-form') {
    page = 1;
    refs.gallery.innerHTML = '';
    refs.loadButton.classList.add('is-hidden');
  }
  const searchQuery = refs.input.value;
  if (searchQuery.trim() === '') {
    return;
  } else {
    getPictures(searchQuery).then(response => {
      if (response.data.hits.length === 0) {
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
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        pictures.map(createOneCardImage).join('')
      );
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      if (page > 1) {
        smoothScroll();
      }
      page += 1;
    });
  }
}
