import products from '@/products.json';

export const fetchProducts = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });

export const fetchProductById = id =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(products.find(product => product.id === id));
    }, 250);
  });
