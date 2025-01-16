import { useEffect, useState } from 'react';
import { getOrdersFromDB } from '../database/getOrdersFromDB';

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getOrdersFromDB((fetchedOrders) => {
      setOrders(fetchedOrders);
    });
  }, []);

  return (
    <div className="p-6">
      <article className="text-2xl font-bold mb-4 prose prose-xl">Histórico de Pedidos</article>

      {orders.length === 0 ? (
        <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
      ) : (
        <div>
          {orders.map((order, _index) => (
            <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-md">
              <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
              <p className="text-gray-600">Total: R$ {order.total.toFixed(2)}</p>
              <div className="mt-4">
                <h4 className="text-gray-600">Itens:</h4>
                <ul>
                  {order.items.map((item: any, i: number) => (
                    <li key={i}>
                      {item.description} - {item.quantity} x R$ {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
