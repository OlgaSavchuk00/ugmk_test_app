import instance from './instance';

export const getProducts = () => instance.get('/products');

export const getProductByFactoryId = (factory_id) => instance.get(`/products?factory_id=${factory_id}`);
