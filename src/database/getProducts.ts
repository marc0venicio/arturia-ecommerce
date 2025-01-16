import initDatabase from './initDatabase';

const getProducts = async (): Promise<{ id: number; description: string; price: number }[]> => {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('products', 'readonly');
    const store = transaction.objectStore('products');

    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export default getProducts;
