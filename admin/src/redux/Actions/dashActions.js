export const createProduct = (info) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection("Products")
      .add({
        name: info.name,
        fullDescription: info.description,
        shortDescription: info.description,
        sku: info.sku,
        price: info.price,
        image: [],
        stock: info.stock,
        offerEnd: "",
        discount: 0,
        category: info.category,
        tag: info.tags,
      })
      .then(() => {
        dispatch({ type: "SERVICE_CREATED", info });
      })
      .catch((err) => {
        dispatch({ type: "SERVICE_ERROR", err });
      });
  };
};

export const createUser = (newUser) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection("Usuarios")
      .where("email", "==", newUser.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((resp) => {
              return db.collection("Usuarios").doc(resp.user.uid).set({
                email: newUser.email,
                userID: resp.user.uid,
                hub: newUser.hub,
                rol: newUser.rols,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
              });
            })
            .then(() => {
              dispatch({ type: "SIGNUP_SUCCESS" });
            })
            .catch((err) => {
              dispatch({ type: "SIGNUP_ERROR", err });
            });
        }
        snapshot.forEach((doc) => {
          dispatch({ type: "USER_ALREADY_EXISTS", doc });
        });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
