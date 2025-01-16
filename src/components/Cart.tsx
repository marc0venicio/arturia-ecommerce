import { useCart } from '../context/CartContext';
import { saveOrderToDB } from '../database/saveOrderToDB';

const Cart = () => {
  const { cart, removeFromCart, setCart } = useCart();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleFinalizeOrder = async () => {
    if (cart.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: parseFloat(getTotalPrice()),
      createdAt: new Date().toISOString(),
    };

    try {
      await saveOrderToDB(order);
      alert('Pedido finalizado com sucesso!');
      clearCart();
    } catch (error) {
      console.error('Erro ao salvar o pedido:', error);
      alert('Ocorreu um erro ao finalizar o pedido. Tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <article className="text-2xl font-bold mb-4 prose prose-xl">Carrinho</article>

      {cart.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col items-center shadow-md"
              >
                <img
                  src={`https://picsum.photos/seed/${item.id}/100/100`}
                  alt={item.description}
                  className="w-24 h-24 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{item.description}</h3>
                <p className="text-gray-600">Preço: R$ {item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantidade: {item.quantity}</p>
                <p className="font-bold mt-2">
                  Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: R$ {getTotalPrice()}</p>
            <button
              onClick={handleFinalizeOrder}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
