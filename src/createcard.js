export function createOneCardImage(picture) {
  return `<div class="photo-card">
  <a href = '${picture.largeImageURL}'>
  <img class="one-photo" src= ${picture.webformatURL}  alt=${picture.tags} loading="lazy" width=300 height=200/>
  </a>
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
