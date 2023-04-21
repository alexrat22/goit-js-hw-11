import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const APIKEY = '35639448-d856c19f58ebd88d37f926e40';
const perPage = 40;
let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadButton.addEventListener('click', onSubmitButtonClick);

refs.loadButton.classList.add('is-hidden');

function onSubmitButtonClick(evt) {
  evt.preventDefault();
  const formInput = evt.currentTarget;
  const searchQuery = formInput.searchQuery.value;
  if (searchQuery.trim() === '') {
    return;
  } else {
    getPictures(searchQuery).then(response => {
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.form.reset();
      } else {
        const pictures = response.data.hits;
        refs.gallery.innerHTML = pictures
          .map(picture => createOneCardImage(picture))
          .join('');
        refs.loadButton.classList.remove('is-hidden');
        refs.form.reset();
      }
    });
  }
}

async function getPictures(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${APIKEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function createOneCardImage(picture) {
  return `<div class="photo-card">
  <img class="one-photo" src= ${picture.webformatURL}  alt=${picture.tags} loading="lazy" width=300 height=200/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
       ${picture.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${picture.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${picture.downloads}
    </p>
  </div>
</div>`;
}
