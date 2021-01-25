import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
  Media,
  Badge,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const Cupones = ({ cupones = [] }) => {
  console.log("cupones", cupones);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const currentCoupons = cupones
    ? cupones.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const pageNumbers = [1];
  const totalPages = Math.ceil(cupones.length / itemsPerPage);
  for (let i = 2; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Promoción" breadcrumbItem="Cupones" />
          <Row className="mb-2">
            <Col sm="12">
              <div className="text-sm-right">
                <Link to="/promocion-cupones/edit/new">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                  >
                    <i className="mdi mdi-plus mr-1"></i> Nuevo cupón
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            {cupones &&
              currentCoupons.map((coupon, key) => (
                <Col xl="3" sm="6" key={"_coupon_" + key}>
                  <Card>
                    <CardBody>
                      <Media>
                        <div className="avatar-md mr-4">
                          <span className="avatar-title rounded-circle bg-soft-primary primary text-primary font-size-16">
                            {coupon.discount}%
                          </span>
                        </div>

                        <Media className="overflow-hidden" body>
                          <h5 className="text-truncate font-size-15">
                            <Link to="#" className="text-dark">
                              {coupon.code}
                            </Link>
                          </h5>
                          <p className="text-muted mb-4">
                            Discount: {coupon.discount}%
                          </p>
                        </Media>
                        <a href={"promocion-cupones/edit/" + coupon.id}>
                          <i className="mdi mdi-pencil font-size-18"></i>
                        </a>
                      </Media>
                    </CardBody>
                    <div className="px-4 py-3 border-top">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item mr-3">
                          <Badge color="primary">{"Active"}</Badge>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>

          <Row>
            <Col lg="12">
              <Pagination className="pagination pagination-rounded justify-content-center mt-2 mb-5">
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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cupones: state.firestore.ordered.Coupons,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Coupons",
      },
    ];
  })
)(Cupones);
