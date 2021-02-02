import React, { useState, useMemo } from "react";
import firebase from "firebase";
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
  FormGroup,
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
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ExcelExport from "../../../components/Common/ExcelExport";
import Form from "reactstrap/lib/Form";

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

const Ordenes = ({ Orders = [] }) => {
  const [modal, setmodal] = useState(false);
  const [modalOrder, setModalOrder] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [search, setSearch] = useState("");
  const [tipoDePago, setTipoDePago] = useState(null);
  const [pagado, setPagado] = useState({value: "Todos", label: "Todos"});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const history = useHistory();

  const tiposDePago = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Tarjeta de Credito", label: "Tarjeta de Credito" },
    { value: "Transferencia", label: "Transferencia" },
  ];

  const opcionesPagado = [
    { value: "Todos", label: "Todos" },
    { value: "Pagado", label: "Pagado" },
    { value: "No pagado", label: "No pagado" },
  ]

  const editOrder = (order) => history.push(`/ordenes/edit/${order.id}`);

  const deleteOrder = (order) => {
    const db = firebase.firestore();
    db.collection("Orders").doc(order.id).delete();
  };

  const marcarPagado = (order) => {
    console.log("Marcando pagado", order);
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    const newDate = new Date(rawDate);
    if (e.target.name === "startDate") {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const resetDates = () => {
    document.getElementById("datesForm").reset();
    setStartDate();
    setEndDate();
  };

  const dateFilter = (order) => {
    if (!startDate || !endDate) return true;

    const date = new Date(order.date.seconds * 1000);
    return date >= startDate && date <= endDate;
  };

  const paymentTypeFilter = (order) => {
    if (!tipoDePago || tipoDePago.length === 0) return true;
    return tipoDePago.some((item) => item.value === order.paymentMethod);
  };

  const paymentStatusFilter = (order) => {
    if (!pagado || pagado.value === "Todos") return true;
    return (pagado.value === "Pagado" ^ !order.payed);
  };

  const orderFilter = (order) =>
    !!order.id &&
    order.id.toLowerCase().includes(search) &&
    dateFilter(order) &&
    paymentTypeFilter(order) &&
    paymentStatusFilter(order);

  let currentOrders = Orders.filter((order) => orderFilter(order));

  const pageNumbers = [1];
  const totalPages = Math.ceil(currentOrders.length / itemsPerPage);
  for (let i = 2; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const itemsPerPageOptions = [
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 50,
      label: 50,
    },
  ];

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
                            placeholder="Buscar por ID"
                            onChange={({ target: { value: v } }) => {
                              setSearch(v);
                            }}
                          />
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
                      </div>
                      <FormGroup className="select2-container">
                        <label className="control-label">
                          Filtrar por tipo de pago:
                        </label>
                        <Select
                          value={tipoDePago}
                          isMulti={true}
                          onChange={(v) => setTipoDePago(v)}
                          options={tiposDePago}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                      <FormGroup className="select2-container">
                        <label className="control-label">
                          Filtrar estatus de pago:
                        </label>
                        <Select
                          value={pagado}
                          onChange={(v) => setPagado(v)}
                          options={opcionesPagado}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="8">
                      <Row className="justify-content-end">
                        <div className="text-sm-right">
                          <ExcelExport data={currentOrders} />
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
                  <Row className="ml-1">
                    <Form id="datesForm" className="form-inline">
                      <FormGroup className="mr-3">
                        <Label className="mr-2" htmlFor="startDate">
                          Start Date
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="startDate"
                          onChange={handleDateChange}
                          id="startDate"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="mr-2" htmlFor="endDate">
                          End Date
                        </Label>
                        <Input
                          className="form-control"
                          type="date"
                          name="endDate"
                          onChange={handleDateChange}
                          id="endDate"
                        />
                      </FormGroup>
                    </Form>
                    <Col className="mt-2 mb-2">
                      <Button
                        type="button"
                        color="success"
                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                        onClick={resetDates}
                      >
                        Reset
                      </Button>
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
                          <th>Tipo de pago</th>
                          <th></th>
                          {/* <th>Ver detalles</th> */}
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Orders &&
                          currentOrders
                            .slice(
                              currentPage * itemsPerPage - itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((order, key) => (
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
                                        className="badge badge-danger mr-1"
                                      >
                                        {item.name} x {item.quantity}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                {/* <td>
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
                                </td> */}
                                <td>{order.tipoDePago}</td>
                                <td>
                                  {order.payed ? (
                                    <span className="badge badge-success mr-1">
                                      Pagado
                                    </span>
                                  ) : (
                                    <span className="badge badge-danger mr-1">
                                      No pagado
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <Link to="#" className="mr-3 text-primary">
                                    <i
                                      className="mdi mdi-pencil font-size-18"
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
                                  <Link to="#" className="mr-3 text-danger">
                                    <i
                                      className="mdi mdi-close font-size-18"
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
                                  {!order.pagado && (
                                    <Link to="#" className="text-success">
                                      <i
                                        className="bx bx-money font-size-16"
                                        id="paidtooltip"
                                        onClick={() => marcarPagado(order)}
                                      ></i>
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="paidtooltip"
                                      >
                                        Marcar pagado
                                      </UncontrolledTooltip>
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="justify-content-end mb-5">
                    <Col sm="1">
                      <Label className="control-label mr-2">
                        Elementos por página
                      </Label>
                    </Col>
                    <Col sm="1">
                      <Select
                        classNamePrefix="select2-selection"
                        className=""
                        placeholder="10"
                        options={itemsPerPageOptions}
                        onChange={(v) => setItemsPerPage(v.value)}
                      />
                    </Col>
                    <Pagination className="pagination pagination-rounded">
                      <PaginationItem disabled={currentPage <= 1}>
                        <PaginationLink
                          previous
                          onClick={() => setCurrentPage((page) => page - 1)}
                        />
                      </PaginationItem>
                      {pageNumbers.map((number) => {
                        return (
                          <PaginationItem
                            active={number === currentPage}
                            key={number}
                            id={number}
                          >
                            <PaginationLink
                              onClick={() => setCurrentPage(number)}
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      <PaginationItem disabled={currentPage >= totalPages}>
                        <PaginationLink
                          next
                          onClick={() => setCurrentPage((page) => page + 1)}
                        />
                      </PaginationItem>
                    </Pagination>
                  </Row>
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
