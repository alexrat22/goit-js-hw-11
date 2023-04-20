import './css/styles.css';
//import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
};

refs.form.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(evt) {
  evt.preventDefault();
  console.log(refs.input.value);
  if (refs.input.value.trim() === '') {
    return;
    //   } else {
    //     fetchCountries(refs.inputField.value.trim())
    //       .then(response => {
    //         if (response.length === 1) {
    //           refs.countryList.innerHTML = '';
    //           refs.oneCountryInfo.innerHTML = createOneCountryInfo(response[0]);
    //         } else if (response.length > 10) {
    //           Notiflix.Notify.info(
    //             'Too many matches found. Please enter a more specific name.'
    //           );
    //           refs.countryList.innerHTML = '';
    //           refs.oneCountryInfo.innerHTML = '';
    //         } else {
    //           refs.countryList.innerHTML = createCountries(response);
    //           refs.oneCountryInfo.innerHTML = '';
    //         }
    //       })
    //       .catch(error => {
    //         Notiflix.Notify.failure('Oops, there is no country with that name');
    //         refs.countryList.innerHTML = '';
    //         refs.oneCountryInfo.innerHTML = '';
    //       });
  }
}

// function createCountries(countries) {
//   return countries
//     .map(country => {
//       return `<li class="country-flag-title">
//     <img class="country-flag" src='${country.flags.svg}' alt="flag of ${country.flags.alt}" width=25/>
//     ${country.name.official}
//     </li>`;
//     })
//     .join('');
// }

function createOneCardImage(card) {
  return `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}
