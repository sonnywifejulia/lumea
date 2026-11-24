const products = new Map([
  ['sweatshirt', '맨투맨 티셔츠'],
  ['t-shirt', '티셔츠'],
  ['tote-bag', '에코백'],
  ['cap', '모자'],
  ['handkerchief', '손수건'],
  ['coin-purse', '동전지갑'],
  ['mug', '머그컵'],
  ['notebooks', '수첩'],
  ['ballpoint-pens', '볼펜'],
  ['keyring', '키링'],
]);

const item = new URLSearchParams(window.location.search).get('item');
const productName = products.get(item);

if (productName) {
  document.title = `${productName} | LUMEA 루메아`;
  document.querySelector('#product-name').textContent = productName;
  const image = document.querySelector('#product-image');
  image.src = `images/goods/${item}.webp`;
  image.alt = productName;
  image.hidden = false;
  document.querySelector('#goods-back').href = `goods.html#${item}`;
} else {
  document.querySelector('#product-unavailable').hidden = false;
}
