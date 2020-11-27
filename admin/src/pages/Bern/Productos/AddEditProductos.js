import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import ProductForm from './ProductForm';

const reducerGen = (attr) => {
    return (acc, curr) => {
        if (curr && curr[attr]) {
            curr[attr].forEach(el => {
                if (!acc[el]) acc[el] = true;
            });
        }
        return acc;
    }
}

const AddEditProductos = ({ location, products }) => {

    const productID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const product = products ? (products.find(x => x.id === productID) || {}) : {};
    const catFilter = reducerGen('category');
    const tagFilter = reducerGen('tag');

    const categories = products ? products.reduce(catFilter, {}) : {};
    const tags = products ? products.reduce(tagFilter, {}) : {};

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Productos" breadcrumbItem={`${product.id ? 'Editar' : 'Añadir'} Producto`} />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del producto</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>
                                    <ProductForm producto={product} categories={categories} tags={tags} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.Products,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: "Products",
            },
        ];
    })
)(AddEditProductos);