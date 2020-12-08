import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import firebase from "firebase";
import Cards from "react-credit-cards";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../redux/actions/cartActions";
import Payment from "./Payment.js";
import "react-credit-cards/es/styles-compiled.css";

const Checkout = ({ location, cartItems, currency, profile, addToCart }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  let history = useHistory();

  const [form, setForm] = useState({
    apartmentNum: "",
    message: "",
  });

  const [cardForm, setCardForm] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const { addToast } = useToasts();
  const createOrder = async (e) => {
    e.preventDefault();
    // const offer = "jejeje";
    // const functions = firebase.functions();
    // const recommendedAlgo = functions.httpsCallable("conektaPayment");
    // const recommended = await recommendedAlgo({ offer });
    // console.log(recommended);
    const db = firebase.firestore();
    console.log(form);
    db.collection("Orders")
      .add({
        firstName: form.firstName,
        lastname: form.lastName,
        phone: form.phone,
        email: form.email,
        createdDate: new Date(),
        price: cartTotalPrice,
        items: cartItems,
        message: form.message,
        address: {
          street: form.streetAddress,
          state: form.state,
          city: form.city,
          zipcode: form.zipcode,
          apartmentNum: form.apartmentNum,
        },
      })
      .then(function (docRef) {
        db.collection("Clients")
          .where("email", "==", form.email)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              db.collection("Clients").add({
                firstName: form.firstName,
                lastname: form.lastName,
                email: form.email,
                lastPurchase: new Date(),
                phone: form.phone,
                total: cartTotalPrice,
                address: {
                  street: form.streetAddress,
                  state: form.state,
                  city: form.city,
                  zipcode: form.zipcode,
                  apartmentNum: form.apartmentNum,
                },
              });
            }
            let data;
            snapshot.forEach((doc) => {
              data = doc.data();
              db.collection("Clients")
                .doc(doc.id)
                .update({
                  total: data.total + cartTotalPrice,
                  lastPurchase: new Date(),
                });
            });
          })
          .catch((err) => {
            console.error(err);
          });
        history.push("/postCheckout/" + docRef.id);
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setCardForm({ ...cardForm, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Hale | Checkout</title>
        <meta name="description" content="Checkout page of Hale Vape Shop." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div>
                <form onSubmit={createOrder} id="checkout">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <h3>Billing Details</h3>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>First Name</label>
                              <input
                                type="text"
                                required
                                name="firstName"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Last Name</label>
                              <input
                                type="text"
                                required
                                name="lastName"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Street Address</label>
                              <input
                                className="billing-address"
                                placeholder="House number and street name"
                                type="text"
                                required
                                name="streetAddress"
                                onChange={handleChange}
                              />
                              <input
                                placeholder="Apartment, suite, unit etc."
                                type="text"
                                name="apartmentNum"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Town / City</label>
                              <input
                                required
                                type="text"
                                name="city"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>State</label>
                              <input
                                required
                                type="text"
                                name="state"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Postcode / ZIP</label>
                              <input
                                required
                                type="text"
                                name="zipcode"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Phone</label>
                              <input
                                required
                                type="tel"
                                name="phone"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Email Address</label>
                              <input
                                required
                                type="email"
                                name="email"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="additional-info-wrap">
                          <h4>Additional information</h4>
                          <div className="additional-info">
                            <label>Order notes</label>
                            <textarea
                              placeholder="Notes about your order, e.g. special notes for delivery. "
                              name="message"
                              defaultValue={""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="your-order-area">
                        <h3>Your order</h3>
                        <div className="your-order-wrap gray-bg-4">
                          <div className="your-order-product-info">
                            <div className="your-order-top">
                              <ul>
                                <li>Product</li>
                                <li>Total</li>
                              </ul>
                            </div>
                            <div className="your-order-middle">
                              <ul>
                                {cartItems.map((cartItem, key) => {
                                  const discountedPrice = getDiscountPrice(
                                    cartItem.price,
                                    cartItem.discount
                                  );
                                  let finalProductPrice = (
                                    cartItem.price * currency.currencyRate
                                  ).toFixed(2);
                                  const finalDiscountedPrice = (
                                    discountedPrice * currency.currencyRate
                                  ).toFixed(2);
                                  let quantAdd;
                                  if (!profile.isEmpty) {
                                    if (cartItem.quantity < cartItem.minQuant) {
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        cartItem.minQuant - cartItem.quantity
                                      );
                                    }
                                    quantAdd = cartItem.minQuant;
                                    finalProductPrice = +(
                                      cartItem.priceDis * currency.currencyRate
                                    ).toFixed(2);
                                  }

                                  discountedPrice != null && profile.isEmpty
                                    ? (cartTotalPrice +=
                                        finalDiscountedPrice *
                                        cartItem.quantity)
                                    : (cartTotalPrice +=
                                        finalProductPrice * cartItem.quantity);

                                  return (
                                    <li key={key}>
                                      <span className="order-middle-left">
                                        {cartItem.name} X {cartItem.quantity}
                                      </span>{" "}
                                      <span className="order-price">
                                        {discountedPrice !== null &&
                                        profile.isEmpty
                                          ? currency.currencySymbol +
                                            (
                                              finalDiscountedPrice *
                                              cartItem.quantity
                                            ).toFixed(2)
                                          : currency.currencySymbol +
                                            (
                                              finalProductPrice *
                                              cartItem.quantity
                                            ).toFixed(2)}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="your-order-bottom">
                              <ul>
                                <li className="your-order-shipping">
                                  Shipping
                                </li>
                                <li>Free shipping</li>
                              </ul>
                            </div>
                            <div className="your-order-total">
                              <ul>
                                <li className="order-total">Total</li>
                                <li>
                                  {currency.currencySymbol +
                                    cartTotalPrice.toFixed(2)}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="payment-method"></div>
                        </div>
                        <div className="place-order mt-25">
                          <button
                            type="submit"
                            form="checkout"
                            className="btn-hover"
                          >
                            Place Order
                          </button>
                        </div>
                        <div id="PaymentForm" style={{ paddingTop: "5vh" }}>
                          <h3>Payment Information</h3>
                          <input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            required
                          />
                          <div style={{ paddingTop: "1vh" }} />
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            Required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                          <div style={{ paddingTop: "1vh" }} />
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <input
                                type="tel"
                                name="expiry"
                                Required
                                placeholder="Expiration Date"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                Required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                              />
                            </div>
                          </div>
                          <div style={{ paddingTop: "3vh" }} />
                          <Cards
                            cvc={cardForm.cvc}
                            expiry={cardForm.expiry}
                            focused={cardForm.focus}
                            name={cardForm.name}
                            number={cardForm.number}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
