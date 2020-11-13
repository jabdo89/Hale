import React from "react";
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
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Productos = ({ products }) => {

  const history = useHistory();

  const editProduct = (product) => history.push(`/productos/edit/${product.id}`);

  const deleteProduct = (product) => {
    console.log('Deleting product', product);
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
                  {/* <div className="search-box mr-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <i className="bx bx-search-alt search-icon"></i>
                    </div>
                  </div> */}
                </Col>
                <Col sm="8">
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
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="">
                    <div className="table-responsive">
                      <Table className="table table-nowrap table-centered">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col" style={{ width: "100px" }}></th>
                            <th scope="col">SKU</th>
                            <th scope="col">Productos</th>
                            <th scope="col">Categorías</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products.map((producto, index) => {
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
                                  <td>
                                    <img src={image} alt="" className="avatar-sm" />
                                  </td>
                                  <td>{sku}</td>
                                  <td>
                                    <h5 className="text-truncate font-size-14">
                                      <Link to="#" className="text-dark">
                                        {name}
                                      </Link>
                                      {producto.new && <span className="badge badge-warning ml-2">Nuevo</span>}
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {shortDescription}
                                    </p>
                                  </td>
                                  <td>{category.map((c, i) => (<span key={i} className="badge badge-primary mr-2">{c}</span>))}</td>
                                  <td>{`$${price}`}</td>
                                  <td>{stock}</td>
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
              <Row>
                <Col xs="12">
                  <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                    <PaginationItem disabled>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
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
                </Col>
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
