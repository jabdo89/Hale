import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Dropzone from 'react-dropzone';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';

const AddEditSliders = ({ location, sliders }) => {

    const history = useHistory();

    const sliderID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const slider = sliders && sliders.find(x => x.id === sliderID) || {};
    const isEditing = sliderID !== 'new' && slider !== {};

    const returnToSliders = () => {
        history.push('/promocion-sliders');
    }

    const deleteImg = (img) => {
        console.log('deleting img', img);
    }

    const [selectedFiles, setselectedFiles] = useState([]);

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
                    <Breadcrumbs title="Promoción" breadcrumbItem={`${isEditing ? 'Editar' : 'Añadir'} Slider`} />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del slider</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>

                                    <Form>
                                        <Row>
                                            <Col sm="4">
                                                <FormGroup>
                                                    <Label htmlFor="slidertitle">Título de slider</Label>
                                                    <Input id="slidertitle" name="slidertitle" type="text" className="form-control"
                                                        defaultValue={(isEditing) ? slider.title : ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4">
                                                <FormGroup>
                                                    <Label htmlFor="slidertitle">Subtítulo de slider</Label>
                                                    <Input id="slidersub" name="slidersub" type="text" className="form-control"
                                                        defaultValue={(isEditing) ? slider.subtitle : ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4">
                                                <FormGroup>
                                                    <Label htmlFor="slidertitle">URL de slider</Label>
                                                    <Input id="sliderurl" name="sliderurl" type="text" className="form-control"
                                                        defaultValue={(isEditing) ? slider.url : ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <CardTitle className="mb-3">Imágen de slider</CardTitle>
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
                                            <Button type="submit" color="secondary" className="waves-effect" onClick={returnToSliders}>Cancel</Button>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
}

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
)(AddEditSliders);