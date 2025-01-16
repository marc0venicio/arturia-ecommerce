import initDatabase from "./initDatabase";

export const saveOrderToDB = (order: any) => {
    return new Promise<void>((resolve, reject) => {
      initDatabase().then((db) => {
        const transaction = db.transaction(['orders'], 'readwrite');
        const store = transaction.objectStore('orders');
        
        const request = store.add({
          items: JSON.stringify(order.items),
          total: order.total,
        });
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = () => {
          reject('Erro ao salvar o pedido');
        };
      });
    });
  };
  