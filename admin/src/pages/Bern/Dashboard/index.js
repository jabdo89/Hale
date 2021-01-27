import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
//import Charts
import StackedColumnChart from "./StackedColumnChart";

import modalimage1 from "../../../assets/images/product/img-7.png";
import modalimage2 from "../../../assets/images/product/img-4.png";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";

function getOrders(orders) {
  return orders.length;
}

function getClients(clients) {
  let total = 0;
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].rol === "Cliente") {
      total += 1;
    }
  }
  return total;
}

function totalEarn(orders) {
  let total = 0;
  for (var i = 0; i < orders.length; i++) {
    total += orders[i].price;
  }
  return total;
}

function getPreviousMonday() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday = new Date();
  if (date.getDay() == 0) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }

  return prevMonday;
}

function getChart(orders, clients, email) {
  console.log(email);
  let series = [];
  if (email === "Year") {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].rol === "Cliente") {
        series.push({
          name: clients[i].email,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      }
    }
    for (var j = 0; j < orders.length; j++) {
      for (var k = 0; k < series.length; k++) {
        if (series[k].name === orders[j].email) {
          const month = new Date(orders[j].date.seconds * 1000).getMonth();
          series[k].data[month] += orders[j].price;
        }
      }
    }
    return series;
  }
  if (email === "Month") {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].rol === "Cliente") {
        series.push({
          name: clients[i].email,
          data: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
        });
      }
    }
    for (var j = 0; j < orders.length; j++) {
      for (var k = 0; k < series.length; k++) {
        if (series[k].name === orders[j].email) {
          if (
            new Date(orders[j].date.seconds * 1000).getYear() ===
            new Date().getYear()
          ) {
            if (
              new Date(orders[j].date.seconds * 1000).getMonth() ===
              new Date().getMonth()
            ) {
              const day = new Date(orders[j].date.seconds * 1000).getDate();
              series[k].data[day - 1] += orders[j].price;
            }
          }
        }
      }
    }
    return series;
  }
  if (email === "Week") {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].rol === "Cliente") {
        series.push({
          name: clients[i].email,
          data: [0, 0, 0, 0, 0, 0, 0],
        });
      }
    }
    for (var j = 0; j < orders.length; j++) {
      for (var k = 0; k < series.length; k++) {
        if (series[k].name === orders[j].email) {
          if (
            new Date(orders[j].date.seconds * 1000) >=
            getPreviousMonday() - 1
          ) {
            const day = new Date(orders[j].date.seconds * 1000).getDay();
            if (day === 0) {
              series[k].data[6] += orders[j].price;
            } else {
              series[k].data[day - 1] += orders[j].price;
            }
          }
        }
      }
    }
    return series;
  }
}

const Dashboard = (props) => {
  const [modal, setmodal] = useState(false);
  const [series, setSeries] = useState(false);
  const [email, setEmail] = useState([
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]);
  const [graphvar, setgraphVar] = useState("Yearly");
  if (props.Orders === undefined || props.Clients === undefined) {
    return null;
  }
  const reports = [
    {
      title: "Orders",
      iconClass: "bx-copy-alt",
      description: getOrders(props.Orders),
    },
    {
      title: "Clients",
      iconClass: "bx-archive-in",
      description: getClients(props.Clients),
    },
    {
      title: "Total Earnings",
      iconClass: "bx-purchase-tag-alt",
      description: "$" + totalEarn(props.Orders),
    },
  ];
  const changeGraph = (data) => {
    if (data.title === "Week") {
      setEmail([
        { title: "Week", linkto: "#", isActive: true },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: false },
      ]);
      setgraphVar("Weekly");
    }
    if (data.title === "Year") {
      setEmail([
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ]);
      setgraphVar("Yearly");
    }
    if (data.title === "Month") {
      setEmail([
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: true },
        { title: "Year", linkto: "#", isActive: false },
      ]);
      setgraphVar("Monthly");
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboard")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            {/* <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col> */}
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted font-weight-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                            <span className="avatar-title">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    Sales {graphvar}
                  </CardTitle>
                  <div className="float-sm-right">
                    <ul className="nav nav-pills">
                      {email.map((mail, key) => (
                        <li className="nav-item" key={"_li_" + key}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => changeGraph(mail)}
                            className={
                              mail.isActive ? "nav-link active" : "nav-link"
                            }
                            to={mail.linkto}
                          >
                            {mail.title}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="clearfix"></div>
                  {/* {action} */}
                  {console.log(graphvar)}
                  {graphvar === "Monthly" ? (
                    <StackedColumnChart
                      series={getChart(props.Orders, props.Clients, "Month")}
                      categories={[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                      ]}
                    />
                  ) : null}
                  {graphvar === "Weekly" ? (
                    <StackedColumnChart
                      series={getChart(props.Orders, props.Clients, "Week")}
                      categories={[
                        "Lunes",
                        "Martes",
                        "Miercoles",
                        "Jueves",
                        "Viernes",
                        "Sabado",
                        "Domingo",
                      ]}
                    />
                  ) : null}
                  {graphvar === "Yearly" ? (
                    <StackedColumnChart
                      series={getChart(props.Orders, props.Clients, "Year")}
                      categories={[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabindex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
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
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Total:</h6>
                    </td>
                    <td>$ 400</td>
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
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    Orders: state.firestore.ordered.Orders,
    Clients: state.firestore.ordered.Users,
  };
};

export default compose(
  withNamespaces(),
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Orders",
      },
      {
        collection: "Users",
      },
    ];
  })
)(Dashboard);
