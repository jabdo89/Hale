import React, { useState, useEffect } from 'react';
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";

const Navbar = (props) => {

    const [promocion, setpromocion] = useState(false);

    useEffect(() => {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    });
    function activateParentDropdown(item) {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    return (<React.Fragment>
        <div className="topnav">
            <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                    <Collapse isOpen={props.leftMenu} className="navbar-collapse" id="topnav-menu-content">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <i className="bx bx-home-circle mr-2"></i>
                                    <span>{props.t('Dashboard')}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/productos" className="nav-link">
                                    <i className="bx bxs-shopping-bag mr-2"></i>
                                    <span>{props.t('Productos')}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/ordenes" className="nav-link">
                                    <i className="bx bxs-receipt mr-2"></i>
                                    <span>{props.t('Órdenes')}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/inventario" className="nav-link">
                                    <i className="bx bxs-box mr-2"></i>
                                    <span>{props.t('Inventario')}</span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="/#" onClick={e => { e.preventDefault(); setpromocion(!promocion); }} className="nav-link dropdown-togglez arrow-none">
                                    <i className="bx bxs-discount mr-2"></i>{props.t('Promoción')} <div className="arrow-down"></div>
                                </Link>
                                <div className={classname("dropdown-menu", { show: promocion })} >
                                    <Link to="/promocion-sliders" className="dropdown-item">{props.t('Sliders')}</Link>
                                    <Link to="/promocion-cupones" className="dropdown-item">{props.t('Cupones')}</Link>
                                    <Link to="/promocion-descuentos" className="dropdown-item">{props.t('Descuentos')}</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="/clientes" className="nav-link">
                                    <i className="bx bxs-user mr-2"></i>
                                    <span>{props.t('Clientes')}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/facturacion" className="nav-link">
                                    <i className="bx bx-money mr-2"></i>
                                    <span>{props.t('Facturación')}</span>
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </nav>
            </div>
        </div>
    </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { leftMenu } = state.Layout;
    return { leftMenu };
};

export default withRouter(connect(mapStatetoProps, {})(withNamespaces()(Navbar)));

