import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Dashboard from "../../views/dashboard";
import Clientes from "../../views/clientes";
import Inventario from "../../views/inventario";
import EditInventario from "../../views/inventario/editInventario";
import Ordenes from "../../views/ordenes";
import Productos from '../../views/productos';
import EditProducto from "../../views/productos/editProducto";
import NewProducto from "../../views/productos/newProducto";
import Cupones from "../../views/promocion/cupones";
import EditCupon from "../../views/promocion/cupones/editCupon";
import NewCupon from "../../views/promocion/cupones/newCupon";
import Descuentos from "../../views/promocion/descuentos";
import Sliders from "../../views/promocion/sliders";
import EditSlider from "../../views/promocion/sliders/editSlider";
import NewSlider from "../../views/promocion/sliders/newSlider";

const Routes = () => (
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/productos" exact component={Productos} />
            <Route path="/productos/new" component={NewProducto} />
            <Route path="/productos/edit" component={EditProducto} />
            <Route path="/inventario" exact component={Inventario} />
            <Route path="/inventario/edit" exact component={EditInventario} />
            <Route path="/sliders" exact component={Sliders} />
            <Route path="/sliders/new" component={NewSlider} />
            <Route path="/sliders/edit" component={EditSlider} />
            <Route path="/cupones" exact component={Cupones} />
            <Route path="/cupones/new" component={NewCupon} />
            <Route path="/cupones/edit" component={EditCupon} />
            <Route path="/descuentos" component={Descuentos} />
            <Route path="/ordenes" component={Ordenes} />
            <Route path="/clientes" component={Clientes} />
            <Redirect to="/dashboard" />
        </Switch>
);

export default Routes;