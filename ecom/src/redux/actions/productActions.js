export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = (products) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    db.collection("Products")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        dispatch(fetchProductsSuccess(snapshot));
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
  // return dispatch => {
  //   dispatch(fetchProductsSuccess(products));
  // };
};
