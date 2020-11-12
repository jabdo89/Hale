import React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Table, Input, Button, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const Clientes = ({ clients }) => {

    console.log('clients', clients);

    const history = useHistory();

    const editClient = (client) => {
        // history.push(`/clientes/edit/${product.id}`);
        console.log('Editing client', client);
    }
  
    const deleteClient = (client) => {
      console.log('Deleting client', client);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Clientes" breadcrumbItem="Lista de clientes" />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col sm="4">
                                            <div className="search-box mr-2 mb-2 d-inline-block">
                                                <div className="position-relative">
                                                    <Input type="text" className="form-control" placeholder="Search..." />
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="8">
                                            <div className="text-sm-right">
                                                <Button type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> New Customers</Button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="table-responsive">
                                        <Table className="table-centered table-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone / Email</th>
                                                    <th>Address</th>
                                                    <th>Total Spent</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clients && clients.map((client, index) => {
                                                    const {
                                                        firstName,
                                                        lastName,
                                                        email,
                                                        phone,
                                                        totalSpent
                                                    } = client;

                                                    return (
                                                        <tr key={index}>
                                                            <td>{firstName + lastName}</td>
                                                            <td>
                                                                <p className="mb-1">{phone}</p>
                                                                <p className="mb-0">{email}</p>
                                                            </td>
                                                            <td>2470 Grove Street Bethpage, NY 11714</td>
                                                            <td>${totalSpent}</td>
                                                            <td>
                                                                <Link to="#" className="mr-3 text-primary">
                                                                    <i
                                                                        className="mdi mdi-pencil font-size-18 mr-3"
                                                                        id="edittooltip"
                                                                        onClick={() => editClient(client)}
                                                                    ></i>
                                                                    <UncontrolledTooltip
                                                                        placement="top"
                                                                        target="edittooltip"
                                                                    >
                                                                        Edit
                                                                    </UncontrolledTooltip>
                                                                </Link>
                                                                <Link to="#" className="text-danger">
                                                                    <i
                                                                        className="mdi mdi-close font-size-18 mr-3"
                                                                        id="deletetooltip"
                                                                        onClick={() => deleteClient(client)}
                                                                    ></i>
                                                                    <UncontrolledTooltip
                                                                        placement="top"
                                                                        target="deletetooltip"
                                                                    >
                                                                        Delete
                                                                    </UncontrolledTooltip>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                                        <PaginationItem disabled>
                                            <PaginationLink previous href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                1
                                                </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">
                                                2
                                                </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                3
                                                </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                4
                                                </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                5
                                                </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink next href="#" />
                                        </PaginationItem>
                                    </Pagination>
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
        clients: state.firestore.ordered.Clients,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: "Clients",
            },
        ];
    })
)(Clientes);