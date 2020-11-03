import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const AddEditProductos = ({ location, products }) => {
    const productID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const isEditing = productID !== 'new';
    const product = products ? products.find(x => x.id === productID) : {};

    const deleteImg = (img) => {
        console.log('deleting img', img);
    }

    const [selectedFiles, setselectedFiles] = useState([]);

    let options = [
        { value: 'AK', label: 'Alaska' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'CA', label: 'California' },
        { value: 'NV', label: 'Nevada' },
        { value: 'OR', label: 'Oregon' },
        { value: 'WA', label: 'Washington' },
    ];

    function handleAcceptedFiles(files) {
        files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size)
        }));

        setselectedFiles(files);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="Productos" breadcrumbItem={`${isEditing ? 'Editar' : 'Añadir'} Producto`} />

                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del producto</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>

                                    <Form>
                                        <Row>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="productname">Nombre de producto</Label>
                                                    <Input id="productname" name="productname" type="text" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="sku">SKU</Label>
                                                    <Input id="sku" name="sku" type="text" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12">
                                                <FormGroup>
                                                    <Label htmlFor="productdesc">Descripción de producto</Label>
                                                    <textarea className="form-control" id="productdesc" rows="5"></textarea>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label className="control-label">Categoría(s)</Label>
                                                    <select className="form-control select2">
                                                        <option>Select</option>
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup className="select2-container">
                                                    <Label className="control-label">Tags</Label>
                                                    <Select classNamePrefix="select2-selection" placeholder="Choose..." title="Country" options={options} isMulti />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="productprice">Precio de producto</Label>
                                                    <Input id="productprice" name="productprice" type="number" pre min={0} className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="productstock">Stock</Label>
                                                    <Input id="productstock" name="productstock" type="number" min={0} className="form-control" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <CardTitle className="mb-3">Imágenes de producto</CardTitle>
                                        <FormGroup>
                                            <Dropzone
                                                accept='image/*'
                                                onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles) }
                                                }
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className="dropzone">
                                                        <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="dz-message needsclick">
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                                                </div>
                                                                <h4>Drop files here or click to upload.</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div
                                                className="dropzone-previews mt-3"
                                                id="file-previews"
                                            >
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                    <Col className="col-auto">
                                                                        <i
                                                                            className="text-danger mdi mdi-close font-size-18 mr-3"
                                                                            id="deletetooltip"
                                                                            onClick={() => deleteImg(f)}
                                                                        ></i>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </FormGroup>
                                        <Row className="justify-content-end">
                                            <Button type="submit" color="primary" className="mr-1 waves-effect waves-light">Save Changes</Button>
                                            <Button type="submit" color="secondary" className="waves-effect">Cancel</Button>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

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
)(AddEditProductos);