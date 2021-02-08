import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import itemsPerPageOptions from '../../../components/Common/itemsPerPageOptions';

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ExcelExport from "../../../components/Common/ExcelExport";
import { useState } from "react";

const Productos = ({ products = [] }) => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const editProduct = (product) =>
    history.push(`/productos/edit/${product.id}`);

  const deleteProduct = (product) => {
    const db = firebase.firestore();
    db.collection("Products").doc(product.id).delete();
  };

  const currentProducts = products.filter((v) =>
    v.name.toLowerCase().includes(search)
  );

  const pageNumbers = [1];
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  for (let i = 2; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Productos" breadcrumbItem="Lista de productos" />
          <Card>
            <CardBody>
              <Row className="mb-2">
                <Col sm="4">
                  {/* TODO: Make functioning search */}
                  <div className="search-box mr-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        onChange={({ target: { value: v } }) => {
                          setSearch(v);
                        }}
                      />
                      <i className="bx bx-search-alt search-icon"></i>
                    </div>
                  </div>
                </Col>
                <Col sm="8">
                  <Row className="justify-content-end">
                    <div className="text-sm-right">
                      <ExcelExport data={currentProducts} />
                    </div>
                    <div className="text-sm-right">
                      <Link to="/productos/edit/new">
                        <Button
                          type="button"
                          color="success"
                          className="btn-rounded waves-effect waves-light mb-2 mr-2"
                        >
                          <i className="mdi mdi-plus mr-1"></i> Nuevo producto
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="">
                    <div className="table-responsive">
                      <Table className="table table-nowrap table-centered">
                        <thead className="thead-light">
                          <tr>
                            {/* <th scope="col" style={{ width: "100px" }}></th> */}
                            <th scope="col">SKU</th>
                            <th scope="col">Productos</th>
                            {/* <th scope="col">Categorías</th> */}
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProducts
                            .slice(
                              currentPage * itemsPerPage - itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((producto, index) => {
                              const {
                                image,
                                sku,
                                name,
                                shortDescription,
                                category,
                                price,
                                stock,
                              } = producto;
                              return (
                                <tr key={index}>
                                  {/* <td>
                                    <img
                                      src={image}
                                      alt=""
                                      className="avatar-sm"
                                    />
                                  </td> */}
                                  <td>{sku}</td>
                                  <td>
                                    <h5 className="text-truncate font-size-14">
                                      <Link to="#" className="text-dark">
                                        {name}
                                      </Link>
                                      {producto.new && (
                                        <span className="badge badge-warning ml-2">
                                          Nuevo
                                        </span>
                                      )}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {shortDescription}
                                    </p>
                                  </td>
                                  {/* <td>
                                    {category.map((c, i) => (
                                      <span
                                        key={i}
                                        className="badge badge-primary mr-2"
                                      >
                                        {c}
                                      </span>
                                    ))}
                                  </td> */}
                                  <td>
                                    <Link to="#" className="mr-3 text-primary">
                                      <i
                                        className="mdi mdi-pencil font-size-18 mr-3"
                                        id="edittooltip"
                                        onClick={() => editProduct(producto)}
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
                                        onClick={() => deleteProduct(producto)}
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
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-end mb-5">
                <Col sm="1">
                  <Label className="control-label mr-2">
                    Elementos por página
                  </Label>
                </Col>
                <Col sm="1">
                  <Select
                    classNamePrefix="select2-selection"
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
                        <PaginationLink onClick={() => setCurrentPage(number)}>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

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
)(Productos);
