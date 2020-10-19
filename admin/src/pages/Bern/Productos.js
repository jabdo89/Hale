import React from 'react';

import { Link } from "react-router-dom";
import { Container, Row, Col, Table, UncontrolledTooltip, Pagination, PaginationItem, PaginationLink } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const data = [
    {
        img: "https://via.placeholder.com/150",
        id: "anc1",
        nombre: "producto 1",
        descripcion: "descripcion 1",
        precio: "240"
    },
    {
        img: "https://via.placeholder.com/150",
        id: "gpd2",
        nombre: "producto 2",
        descripcion: "descripcion 2",
        precio: "250"
    },
    {
        img: "https://via.placeholder.com/150",
        id: "cmw3",
        nombre: "producto1",
        descripcion: "descripcion 1",
        precio: "260"
    },
]

const Productos = (props) => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Productos" breadcrumbItem="Lista de productos" />

                    <Row>
                        <Col lg="12">
                            <div className="">
                                <div className="table-responsive">
                                    <Table className="project-list-table table-nowrap table-centered table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "100px" }}></th>
                                                <th scope="col">ID</th>
                                                <th scope="col">Productos</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Estatus</th>
                                                <th scope="col">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((producto, index) => {
                                                    const { img, id, nombre, descripcion, precio } = producto;
                                                    return (<tr key={index}>
                                                        <td><img src={img} alt="" className="avatar-sm" /></td>
                                                        <td>{id}</td>
                                                        <td>
                                                            <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">{nombre}</Link></h5>
                                                            <p className="text-muted mb-0">{descripcion}</p>
                                                        </td>
                                                        <td>{`$${precio}`}</td>
                                                        <td><span className="badge badge-primary">Completed</span></td>
                                                        {/* <td><span className="badge badge-warning">Pending</span></td> */}
                                                        {/* <td><span className="badge badge-danger">Delay</span></td> */}
                                                        <td>
                                                            <Link to="#" className="mr-3 text-primary">
                                                                <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip"></i>
                                                                <UncontrolledTooltip placement="top" target="edittooltip">
                                                                    Edit
                                                                </UncontrolledTooltip >
                                                            </Link>
                                                            <Link to="#" className="text-danger">
                                                                <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip"></i>
                                                                <UncontrolledTooltip placement="top" target="deletetooltip">
                                                                    Delete
                                                                </UncontrolledTooltip >
                                                            </Link>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}


export default Productos;