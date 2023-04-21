import './css/styles.css';
import axios from 'axios';
//import Notiflix from 'notiflix';

const APIKEY = '35639448-d856c19f58ebd88d37f926e40';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
  evt.preventDefault();
  const formInput = evt.currentTarget;
  const searchQuery = formInput.searchQuery.value;
  if (searchQuery.trim() === '') {
    return;
  } else {
    getPictures(searchQuery);
  }
}

async function getPictures(searchQuery) {
  const responseData = await axios.get(
    `https://pixabay.com/api/?key=${APIKEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  );
  const pictures = responseData.data.hits;
  refs.gallery.innerHTML = pictures
    .map(picture => createOneCardImage(picture))
    .join('');
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
