import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({}))
      const response = await fetch(
        "https://react-reduxshoppingcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const responseData = await response.json();
    };

    if (!response.ok) {
      throw new Error("Sending cart data failed.");
    }

    sendCartData();
  }, [cart]);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
