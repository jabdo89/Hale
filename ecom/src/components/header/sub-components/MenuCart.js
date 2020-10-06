import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { addToCart } from "../../../redux/actions/cartActions";
import { getDiscountPrice } from "../../../helpers/product";

const MenuCart = ({ cartData, currency, deleteFromCart, profile }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single.price,
                single.discount
              );
              let finalProductPrice = (
                single.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);
              let quantAdd;
              if (!profile.isEmpty) {
                quantAdd = single.minQuant;
                finalProductPrice = +(
                  single.priceDis * currency.currencyRate
                ).toFixed(2);
              }

              discountedPrice != null && profile.isEmpty
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.id}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + single.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single.id}
                      >
                        {" "}
                        {single.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null && profile.isEmpty
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice}
                    </span>
                    {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuCart);
