const containerElement = document.getElementById('container');
const textElement = document.getElementById('search'); //todo elemento con el que tengo que interactuar ejecuta un evento
const checkBoxElement = document.getElementById('sugar-checkbox');
const orderProductsElement = document.getElementById('order');

const products = [
  {
    title: 'Waffle with Berries',
    img: '/assets/images/image-waffle.jpg',
    sugarless: 'Sugarless',
    price: 6.5,
  },
  {
    title: 'Vanilla Bean Crème Brûlée',
    img: '/assets/images/image-creme-brulee.jpg',
    sugarless: 'Sugarless',
    price: 7.0,
  },
  {
    title: 'Macaron Mix of Five',
    img: '/assets/images/image-macaron.jpg',
    sugarless: '',
    price: 8.0,
  },
  {
    title: 'Classic Tiramisu',
    img: '/assets/images/image-tiramisu.jpg',
    sugarless: '',
    price: 5.5,
  },
  {
    title: 'Lemon Meringue Pie',
    img: '/assets/images/image-baklava.jpg',
    sugarless: 'Sugarless',
    price: 5.0,
  },
  {
    title: 'Lemon Meringue Pie',
    img: '/assets/images/image-meringue.jpg',
    sugarless: '',
    price: 5.0,
  },
  {
    title: 'Red Velvet Cake',
    img: '/assets/images/image-cake.jpg',
    sugarless: '',
    price: 4.5,
  },
  {
    title: 'Salted Caramel Brownie',
    img: '/assets/images/image-brownie.jpg',
    sugarless: '',
    price: 5.5,
  },
  {
    title: 'Vanilla Panna Cotta',
    sugarless: 'Sugarless',
    img: '/assets/images/image-panna-cotta.jpg',
    price: 6.5,
  },
];

const printProducts = (array) => {
  const fragment = document.createDocumentFragment();
  array.map((product) => {
    const newItem = document.createElement('div');
    newItem.classList.add('container-image');

    const imgElement = document.createElement('img');
    imgElement.classList.add('image');
    imgElement.src = product.img;
    imgElement.alt = product.name;

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const nameElement = document.createElement('h2');
    nameElement.classList.add('title');
    nameElement.textContent = product.title;

    const sugarlessElement = document.createElement('p');
    sugarlessElement.textContent = product.sugarless ? 'sugarless' : '';

    const priceElement = document.createElement('p');
    priceElement.textContent = `$${product.price.toFixed(2)}`;

    textDiv.append(nameElement, sugarlessElement, priceElement);
    newItem.append(imgElement, textDiv);

    containerElement.textContent = '';

    fragment.append(newItem);
  });
  containerElement.append(fragment);
};
printProducts(products);

const filterTextElement = (e) => {
  console.log(e.target.value);
  const filter = products.filter((product) => {
    return product.title.toLowerCase().includes(e.target.value); //si quieres el elemento entero es .target y si quieres cualquier propiedad del elemento es .target. y el nombre de la propiedad que quieras
  });
  checkBoxElement.checked = false;
  orderProductsElement.value = 'default';
  printProducts(filter);
};

const filterCheckBox = (e) => {
  console.log(e.target.checked);
  const filter = products.filter((product) => {
    if (e.target.checked) {
      return product.sugarless.toLowerCase().includes('sugarless');
    } else {
      return product;
    }
  });
  orderProductsElement.value = 'default';
  textElement.value = '';

  printProducts(filter);
};

const filterNamePrice = (e) => {
  const option = e.target.value;

  let orderproducts = [...products];

  orderproducts = orderproducts.sort((a, b) => {
    if (option === 'name') {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    } else if (option === 'price') {
      return b.price - a.price;
    }
  });
  textElement.value = '';
  checkBoxElement.checked = false;

  printProducts(orderproducts);
};

textElement.addEventListener('input', filterTextElement);
checkBoxElement.addEventListener('change', filterCheckBox);
orderProductsElement.addEventListener('change', filterNamePrice);
