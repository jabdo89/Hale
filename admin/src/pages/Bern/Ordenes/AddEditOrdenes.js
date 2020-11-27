import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import OrderForm from './OrderForm';

const AddEditOrdenes = ({ location, orders, products }) => {
    const orderID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const order = orders ? (orders.find(x => x.id === orderID) || {}) : {};

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="Órdenes" breadcrumbItem={`${order.id ? 'Editar' : 'Añadir'} Órdenes`} />

                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Información de la orden</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>
                                    <OrderForm orden={order} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.firestore.ordered.Orders,
        products: state.firestore.ordered.Products,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: "Orders",
            },
            {
                collection: "Products",
            },
        ];
    })
)(AddEditOrdenes);