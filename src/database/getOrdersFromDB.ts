import initDatabase from "./initDatabase";

export const getOrdersFromDB = (callback: (orders: any[]) => void) => {
    initDatabase().then((db) => {
      const transaction = db.transaction(['orders'], 'readonly');
      const store = transaction.objectStore('orders');
      
      const request = store.getAll();
  
      request.onsuccess = () => {
        const orders = request.result.map((order: any) => ({
          id: order.id,
          items: JSON.parse(order.items),
          total: order.total,
        }));
        callback(orders);
      };
  
      request.onerror = () => {
        console.log('Erro ao buscar pedidos');
      };
    });
  };
  