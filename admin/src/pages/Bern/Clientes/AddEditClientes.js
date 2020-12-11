import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import ClientForm from './ClientForm';

const clientsFromUsers = (users) => (users && users.filter(user => user.role === 'cliente')) || [];

const AddEditClientes = ({ location, clientes: users }) => {

    const clientes = clientsFromUsers(users);
    const clientID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const client = clientes ? (clientes.find(x => x.id === clientID) || {}) : {};

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Cliente" breadcrumbItem={`${client.id ? 'Editar' : 'Añadir'} Cliente`} />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del cliente</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>
                                    <ClientForm cliente={client} />
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
            }
        ];
    })
)(AddEditClientes);