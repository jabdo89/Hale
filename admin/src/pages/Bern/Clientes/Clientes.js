import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Clientes = ({ clients }) => {
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
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
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
                          <th>Last Purchase</th>
                          <th>Total Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients &&
                          clients.map((client, index) => {
                            const {
                              firstName,
                              lastName,
                              email,
                              phone,
                              total,
                              address,
                              lastPurchase,
                            } = client;

                            return (
                              <tr key={index}>
                                <td>
                                  {firstName} {lastName}
                                </td>
                                <td>
                                  <p className="mb-1">{phone}</p>
                                  <p className="mb-0">{email}</p>
                                </td>
                                <td>{address.street}</td>
                                <td>
                                  {" "}
                                  {moment(
                                    new Date(lastPurchase.seconds * 1000)
                                  ).format("MMM Do YYYY")}
                                </td>
                                <td>${total}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                    <PaginationItem disabled>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
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
};

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
