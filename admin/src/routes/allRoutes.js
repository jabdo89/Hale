import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
// Bern
import Dashboard from "../pages/Bern/Dashboard";
import AddEditProductos from "../pages/Bern/Productos/AddEditProductos";
import Productos from "../pages/Bern/Productos/Productos";
import AddEditOrdenes from "../pages/Bern/Ordenes/AddEditOrdenes";
import Ordenes from "../pages/Bern/Ordenes/Ordenes";
import AddEditClientes from "../pages/Bern/Clientes/AddEditClientes";
import Clientes from "../pages/Bern/Clientes/Clientes";
import AddEditSliders from "../pages/Bern/Promocion/Sliders/AddEditSliders";
import Sliders from "../pages/Bern/Promocion/Sliders/Sliders";
import AddEditCupones from "../pages/Bern/Promocion/Cupones/AddEditCupones";
import Cupones from "../pages/Bern/Promocion/Cupones/Cupones";
import Descuentos from "../pages/Bern/Promocion/Descuentos/Descuentos";
import Inventario from "../pages/Bern/Inventario/Inventario";
import Facturacion from "../pages/Bern/Facturacion/Facturacion";

const userRoutes = [
  //Bern
  { path: "/dashboard", component: Dashboard },
  { path: "/productos/edit/:id", component: AddEditProductos },
  { path: "/productos", component: Productos },
  { path: "/ordenes/edit/:id", component: AddEditOrdenes },
  { path: "/ordenes", component: Ordenes },
  { path: "/inventario", component: Inventario },
  { path: "/clientes/edit/:id", component: AddEditClientes },
  { path: "/clientes", component: Clientes },
  { path: "/promocion-sliders/edit/:id", component: AddEditSliders },
  { path: "/promocion-sliders", component: Sliders },
  { path: "/promocion-cupones/edit/:id", component: AddEditCupones },
  { path: "/promocion-cupones", component: Cupones },
  { path: "/promocion-descuentos", component: Descuentos },
  { path: "/facturacion", component: Facturacion },

  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-forget-pwd", component: ForgetPwd1 },
  { path: "/auth-lock-screen", component: LockScreen },
];

export { userRoutes, authRoutes };
