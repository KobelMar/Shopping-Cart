import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {

    const fetchData = async () => {
      const response = await fetch(
        "https://react-reduxshoppingcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("could not fetch cart data.");
      } 
      const data = await response.json();
      return data;
    };

    try {
      const cartData= await fetchData();
      dispatch(cartActions.replaceCart({items: cartData.items || [], totalQuantity: cartData.totalQuantity} ));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Fetching data failed.",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  //Toolkit sess that is you dispatch a function that returns a function instaead of a action object
  // like here, redux will automatically pass us the dispatch-arguement, wich eventually reach some reducer.
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-reduxshoppingcart-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({totalQuantity: cart.totalQuantity, items: cart.items}),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    };

    try {
      await sendRequest();

      setTimeout(() => {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success...",
            message: "Sendt cart data successfully.",
          })
        );
      }, 400);
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};
