import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Table,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ExcelExport from "../../../components/Common/ExcelExport";

const OrderDetailModal = ({ order, isOpen, setmodal }) => {
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      toggle={() => {
        setmodal(!isOpen);
      }}
    >
      <div className="modal-content">
        <ModalHeader
          toggle={() => {
            setmodal(!isOpen);
          }}
        >
          Order Details
        </ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Order ID: <span className="text-primary">#{order.id}</span>
          </p>
          <p className="mb-4">
            Billing Name:{" "}
            <span className="text-primary">{`${order.firstName} ${order.lastname}`}</span>
          </p>

          <div className="table-responsive">
            <Table className="table table-centered table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items &&
                  order.items.map((item, key) => (
                    <tr key={key}>
                      <th scope="row">
                        <div>
                          <img
                            src={item.image[0]}
                            alt=""
                            className="avatar-sm"
                          />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            {item.name}
                          </h5>
                          <p className="text-muted mb-0">
                            $ {item.price} x {item.quantity}
                          </p>
                        </div>
                      </td>
                      <td>$ {item.price * item.quantity - item.discount}</td>
                    </tr>
                  ))}
                <tr>
                  <td>
                    <h6 className="m-0 text-right">Sub Total:</h6>
                  </td>
                  <td>$ {order.price}</td>
                </tr>
                <tr>
                  <td>
                    <h6 className="m-0 text-right">Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>
                    <h6 className="m-0 text-right">Total:</h6>
                  </td>
                  <td>$ {order.price}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              setmodal(!isOpen);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

const Ordenes = ({ Orders }) => {
  const [modal, setmodal] = useState(false);
  const [modalOrder, setModalOrder] = useState({});

  const history = useHistory();

  const editOrder = (order) => history.push(`/ordenes/edit/${order.id}`);

  const deleteOrder = (order) => {
    console.log("Deleting order", order);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Órdenes" breadcrumbItem="Lista de órdenes" />
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
                    <Col sm="8">
                      <Row className="justify-content-end">
                        <div className="text-sm-right">
                          <ExcelExport data={Orders} />
                        </div>
                        <div className="text-sm-right">
                          <Link to="/ordenes/edit/new">
                            <Button
                              type="button"
                              color="success"
                              className="btn-rounded waves-effect waves-light mb-2 mr-2"
                            >
                              <i className="mdi mdi-plus mr-1"></i> Nueva orden
                            </Button>
                          </Link>
                        </div>
                      </Row>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table table-centered table-nowrap">
                      <thead className="thead-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Billing Name</th>
                          <th>Email</th>
                          <th>Fecha</th>
                          <th>Total</th>
                          <th>Items</th>
                          <th>Ver detalles</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Orders &&
                          Orders.map((order, key) => (
                            <tr key={"_order_" + key}>
                              <td>
                                <Link
                                  to="#"
                                  className="text-body font-weight-bold"
                                >
                                  {order.id}
                                </Link>
                              </td>
                              <td>{`${order.firstName} ${order.lastname}`}</td>
                              <td>{order.email}</td>
                              <td>
                                {order.date
                                  ? moment(
                                      new Date(order.date.seconds * 1000)
                                    ).format("MMM Do YYYY")
                                  : null}
                              </td>
                              <td>${order.price}</td>
                              <td>
                                <div>
                                  {order.items.map((item, i) => (
                                    <span
                                      key={i}
                                      className="badge badge-danger"
                                    >
                                      {item.name}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <Button
                                  type="button"
                                  color="primary"
                                  className="btn-sm btn-rounded"
                                  onClick={() => {
                                    setModalOrder(order);
                                    setmodal(!modal);
                                  }}
                                >
                                  View Details
                                </Button>
                              </td>
                              <td>
                                <Link to="#" className="mr-3 text-primary">
                                  <i
                                    className="mdi mdi-pencil font-size-18 mr-3"
                                    id="edittooltip"
                                    onClick={() => editOrder(order)}
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
                                    onClick={() => deleteOrder(order)}
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
                          ))}
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
      <OrderDetailModal order={modalOrder} isOpen={modal} setmodal={setmodal} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    Orders: state.firestore.ordered.Orders,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Orders",
      },
    ];
  })
)(Ordenes);
