const mobileGoods = window.matchMedia('(max-width: 720px)');

document.querySelectorAll('.goods-photo').forEach((photo) => {
  const productName = photo.nextElementSibling.textContent;

  function updatePhotoLink() {
    if (mobileGoods.matches) {
      photo.removeAttribute('role');
      photo.removeAttribute('aria-pressed');
      photo.setAttribute('aria-label', `${productName} 상세 보기`);
    } else {
      photo.setAttribute('role', 'button');
      photo.setAttribute('aria-pressed', 'false');
      photo.setAttribute('aria-label', `${productName} 이미지 확대`);
    }
  }

  updatePhotoLink();
  mobileGoods.addEventListener('change', updatePhotoLink);

  photo.addEventListener('click', (event) => {
    if (mobileGoods.matches) return;

    event.preventDefault();
    const zoomed = photo.getAttribute('aria-pressed') === 'true';
    photo.setAttribute('aria-pressed', String(!zoomed));
  });

  photo.addEventListener('keydown', (event) => {
    if (mobileGoods.matches || event.key !== ' ') return;

    event.preventDefault();
    if (!event.repeat) photo.click();
  });
});
