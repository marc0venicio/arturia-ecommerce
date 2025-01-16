import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import ProductTable from "../components/ProductTable";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/user");
    }
  }, [navigate]);

  return (
    <div className="content" style={{ margin: "auto" }}>
      <div className="container content-center mx-auto my-auto p-4">
        <Link
          to="/order-history"
          className="block mt-4 text-blue-500 hover:underline"
        >
          Consultar pedidos anteriores
        </Link>
        <article className="text-2xl font-bold mb-4 prose prose-lg">
          Catálogo de Produtos
        </article>
        <ProductTable />
        <article className="text-2xl font-bold mt-8 prose prose-lg">
          Seu Carrinho
        </article>
        <Cart />
      </div>
      <Link
        to="/order-history"
        className="block mt-4 text-blue-500 hover:underline"
      >
        Consultar pedidos anteriores
      </Link>
    </div>
  );
};

export default HomePage;
