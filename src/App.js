import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import Cart from './components/cart/Cart';
import { useState } from 'react';
import { CartProvider } from './store/cartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const showCart = () => setIsCartOpen(true);
  const hideCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      {isCartOpen && <Cart onClose={hideCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
