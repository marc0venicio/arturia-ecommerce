import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import getProducts from '../database/getProducts';

interface Product {
  id: number;
  description: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-bold">{product.description}</h3>
          <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
