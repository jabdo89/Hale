import React from "react";
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
  UncontrolledTooltip,
  Badge,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { useState } from "react";

const Sliders = ({ sliders = [] }) => {
  console.log("sliders", sliders);

  const deleteSlider = (slider) => {
    console.log("Deleting slider", slider);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const currentSliders = sliders
    ? sliders.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const pageNumbers = [1];
  const totalPages = Math.ceil(sliders.length / itemsPerPage);
  for (let i = 2; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Promoción" breadcrumbItem="Sliders" />
          <Row className="mb-2">
            <Col sm="12">
              <div className="text-sm-right">
                <Link to="/promocion-sliders/edit/new">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                  >
                    <i className="mdi mdi-plus mr-1"></i> Nuevo slider
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            {sliders &&
              currentSliders.map((slider, key) => (
                <Col xl="4" sm="6" key={"_slider_" + key}>
                  <Card>
                    <CardBody>
                      <Media>
                        <div className="avatar-md mr-4">
                          <span className="avatar-title waves-effect rounded-circle bg-light text-danger font-size-16">
                            <img src={slider.image} alt="" height="90" />
                          </span>
                        </div>

                        <Media className="overflow-hidden" body>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              {slider.title}
                            </Link>
                          </h5>
                          <p className="text-muted mb-4">{slider.subtitle}</p>
                        </Media>
                        <a href={"promocion-sliders/edit/" + slider.id}>
                          <i
                            id="edittooltip"
                            className="mdi mdi-pencil font-size-18"
                          ></i>
                          <UncontrolledTooltip
                            placement="top"
                            target="edittooltip"
                          >
                            Edit
                          </UncontrolledTooltip>
                        </a>
                        <a>
                          <div className="text-danger">
                            <i
                              className="mdi mdi-close font-size-18 ml-3"
                              id="deletetooltip"
                              onClick={() => deleteSlider(slider)}
                            ></i>
                            <UncontrolledTooltip
                              placement="top"
                              target="deletetooltip"
                            >
                              Delete
                            </UncontrolledTooltip>
                          </div>
                        </a>
                      </Media>
                    </CardBody>
                    <div className="px-4 py-3 border-top">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item mr-3">
                          <Badge color="primary">{"Active"}</Badge>
                        </li>
                        <li className="list-inline-item mr-3" id="url">
                          <i className="bx bx-window-alt mr-1"></i> {slider.url}
                          <UncontrolledTooltip placement="top" target="url">
                            URL
                          </UncontrolledTooltip>
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
    sliders: state.firestore.ordered.Sliders,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Sliders",
      },
    ];
  })
)(Sliders);
