import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import itemsPerPageOptions from '../../../components/Common/itemsPerPageOptions';

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useHistory } from "react-router-dom";
import ExcelExport from "../../../components/Common/ExcelExport";
import { useState } from "react";
import Select from "react-select";
import TablePagination from "../../../components/Common/TablePagination";

// const Clientes = ({ clients }) => {
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Breadcrumbs title="Clientes" breadcrumbItem="Lista de clientes" />
//           <Row>
//             <Col xs="12">
//               <Card>
//                 <CardBody>
//                   <Row className="mb-2">
//                     <Col sm="4">
//                       <div className="search-box mr-2 mb-2 d-inline-block">
//                         <div className="position-relative">
//                           <Input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search..."
//                           />
//                           <i className="bx bx-search-alt search-icon"></i>
//                         </div>
//                       </div>
//                     </Col>
//                   </Row>

//                   <div className="table-responsive">
//                     <Table className="table-centered table-nowrap">
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Phone / Email</th>
//                           <th>Address</th>
//                           <th>Last Purchase</th>
//                           <th>Total Spent</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {clients &&
//                           clients.map((client, index) => {
//                             const {
//                               firstName,
//                               lastName,
//                               email,
//                               phone,
//                               total,
//                               address,
//                               lastPurchase,
//                             } = client;

//                             return (
//                               <tr key={index}>
//                                 <td>
//                                   {firstName} {lastName}
//                                 </td>
//                                 <td>
//                                   <p className="mb-1">{phone}</p>
//                                   <p className="mb-0">{email}</p>
//                                 </td>
//                                 <td>{address.street}</td>
//                                 <td>
//                                   {" "}
//                                   {moment(
//                                     new Date(lastPurchase.seconds * 1000)
//                                   ).format("MMM Do YYYY")}
//                                 </td>
//                                 <td>${total}</td>
//                               </tr>
//                             );
//                           })}
//                       </tbody>
//                     </Table>
//                   </div>
//                   <Pagination className="pagination pagination-rounded justify-content-end mb-2">
//                     <PaginationItem disabled>
//                       <PaginationLink previous href="#" />
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink href="#">1</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem active>
//                       <PaginationLink href="#">2</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink href="#">3</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink href="#">4</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink href="#">5</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink next href="#" />
//                     </PaginationItem>
//                   </Pagination>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     clients: state.firestore.ordered.Clients,
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((props) => {
//     return [
//       {
//         collection: "Clients",
//       },
//     ];
//   })
// )(Clientes);

const Clientes = ({ clients = [] }) => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const editClient = (client) => history.push(`/clientes/edit/${client.id}`);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const currentClients = clients
    ? clients.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const pageNumbers = [1];
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  for (let i = 2; i <= totalPages; i++) {
    pageNumbers.push(i);
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
                          <ExcelExport data={currentClients} />
                        </div>
                        <div className="text-sm-right">
                          <Link to="/clientes/edit/new">
                            <Button
                              type="button"
                              color="success"
                              className="btn-rounded waves-effect waves-light mb-2 mr-2"
                            >
                              <i className="mdi mdi-plus mr-1"></i> Nuevo
                              cliente
                            </Button>
                          </Link>
                        </div>
                      </Row>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Productos</th>
                          <th>Total Spent</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients &&
                          currentClients
                            .filter((v) =>
                              (v.firstName + " " + v.lastName)
                                .toLowerCase()
                                .includes(search)
                            )
                            .map((client, index) => {
                              const {
                                firstName,
                                lastName,
                                totalSpent,
                                productoUno,
                                productoDos,
                              } = client;

                              return (
                                <tr key={index}>
                                  <td>
                                    {firstName} {lastName}
                                  </td>
                                  <td>
                                    <span className="badge badge-danger">
                                      {productoUno}
                                    </span>
                                    {productoDos && (
                                      <span className="ml-2 badge badge-danger">
                                        {productoDos}
                                      </span>
                                    )}
                                  </td>
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
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                  </div>
                  <TablePagination
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    pageNumbers={pageNumbers}
                    totalPages={totalPages}
                  />
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
    clients: state.firestore.ordered.Users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Users",
      },
    ];
  })
)(Clientes);
