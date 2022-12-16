 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";


import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {

const cartIsVisible = useSelector(state => state.ui.cartIsVisible )
const cart = useSelector(state => state.cart )


useEffect(()=>{
  fetch("https://react-reduxshoppingcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json", {
    method: "PUT", body: JSON.stringify(cart)
  })
}, [cart])


  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
