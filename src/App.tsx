import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import { CartProvider } from './context/CartContext';
import UserForm from './components/UserForm';

const App = () => (
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-history" element={<OrdersPage />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </CartProvider>
  </Router>
);

export default App;
