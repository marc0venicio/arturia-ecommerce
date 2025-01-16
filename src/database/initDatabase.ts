const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EcommerceDB', 2);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains('products')) {
        const store = db.createObjectStore('products', { keyPath: 'id' });
        store.createIndex('description', 'description', { unique: false });
        store.createIndex('price', 'price', { unique: false });

        store.add({ id: 1, description: 'Produto 1', price: 10.99 });
        store.add({ id: 2, description: 'Produto 2', price: 20.99 });
        store.add({ id: 3, description: 'Produto 3', price: 30.99 });
      }

      if (!db.objectStoreNames.contains('orders')) {
        const store = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
        store.createIndex('total', 'total', { unique: false });
        store.createIndex('items', 'items', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export default initDatabase;
