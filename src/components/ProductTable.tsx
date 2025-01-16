import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import getProducts from '../database/getProducts';

interface Product {
  id: number;
  description: string;
  price: number;
  image: string;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      const productsWithImages = products.map(product => ({
        ...product,
        image: `https://picsum.photos/seed/${product.description}/100/100`,
      }));
      setProducts(productsWithImages);
    };

    fetchProducts();
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Imagem</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Preço</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Quantidade</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Subtotal</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const quantity = cartItem?.quantity || 0;
            const subtotal = (quantity * product.price).toFixed(2);

            return (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={product.image} alt={product.description} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">R$ {product.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">R$ {subtotal}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                  >
                    Adicionar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="border border-gray-300 px-4 py-2 text-right font-bold">Total:</td>
            <td colSpan={2} className="border border-gray-300 px-4 py-2 text-center font-bold">R$ {getTotalPrice()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
