import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { useToasts } from "react-toast-notifications";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = ({ location, deleteAllFromCart }) => {
  const { pathname } = location;

  const { addToast } = useToasts();

  const [form, setForm] = useState();
  const [error, setError] = useState();

  const [formSignUp, setFormSignUp] = useState();
  const [errorSignUp, setErrorSignUp] = useState();

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        deleteAllFromCart();
        history.push("/shop-grid-standard/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("Users")
      .where("email", "==", formSignUp.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              formSignUp.email,
              formSignUp.password
            )
            .then((resp) => {
              return db.collection("Users").doc(resp.user.uid).set({
                id: resp.user.uid,
                rol: "distributor",
                name: formSignUp.name,
                email: formSignUp.email,
              });
            })
            .then(() => {
              deleteAllFromCart();
              history.push("/shop-grid-standard/");
            })
            .catch((err) => {
              setErrorSignUp(err.message);
            });
        }
        snapshot.forEach((doc) => {
          setErrorSignUp("User already exists");
        });
      })
      .catch((err) => {
        setErrorSignUp(err.message);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeSignUp = (e) => {
    setFormSignUp({ ...formSignUp, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Hale | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={login}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                              />
                              <div style={{ color: "red" }}>{error}</div>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={signUp}>
                              <input
                                type="name"
                                name="name"
                                placeholder="Name"
                                onChange={handleChangeSignUp}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleChangeSignUp}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChangeSignUp}
                              />
                              <div style={{ color: "red" }}>{errorSignUp}</div>
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginRegister);
