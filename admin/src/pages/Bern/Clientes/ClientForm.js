import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardTitle,
  Button,
  Label,
  CardSubtitle,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import firebase from "firebase";
import { secondConfig } from "../../../redux/config";

const ClientForm = ({ cliente = {}, products = [] }) => {
  const history = useHistory();
  let id = history.location.pathname.substring(
    history.location.pathname.lastIndexOf("/")
  );

  const returnToProducts = () => {
    history.push("/clientes");
  };

  console.log(cliente, "bool");

  const [clientData, setClientData] = useState(cliente);

  useEffect(() => setClientData(cliente), [cliente]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(clientData);
    const db = firebase.firestore();
    const secondAuth = firebase.initializeApp(secondConfig, "Secondary");
    console.log(clientData);
    db.collection("Users")
      .where("email", "==", clientData.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          secondAuth
            .auth()
            .createUserWithEmailAndPassword(
              clientData.email,
              clientData.password
            )
            .then((resp) => {
              return db.collection("Users").doc(resp.user.uid).set({
                email: clientData.email,
              });
            })
            .then(() => {
              secondAuth.delete();
              history.push("/clientes");
            })
            .catch((err) => {
              secondAuth.delete();
              console.error(err);
            });
        }
        snapshot.forEach((doc) => {
          secondAuth.delete();
          console.error(doc);
        });
      })
      .catch((err) => {
        secondAuth.delete();
        console.error(err);
      });
    console.log(clientData);
    console.log("updating/creating client", clientData);
  };

  const handleTextChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setClientData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    console.log("changing check value", name, value);

    setClientData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    if (e.target.type === "number") {
      if (e.target.max)
        e.target.value = Math.min(+e.target.max, +e.target.value);
      if (e.target.min)
        e.target.value = Math.max(+e.target.min, +e.target.value);
    }

    const name = e.target.name;
    const value = +e.target.value;
    setClientData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (v) => {
    console.log("new values in category", v);

    const newCategories = v ? v.map((c) => c.value) : [];

    setClientData((prevProduct) => ({
      ...prevProduct,
      category: newCategories,
    }));
  };

  const handleTagChange = (v) => {
    console.log("new values in tag", v);

    const newTags = v ? v.map((t) => t.value) : [];

    setClientData((prevProduct) => ({
      ...prevProduct,
      tag: newTags,
    }));
  };

  const deleteImg = (imageIndexAttr = "imagenUno") => {
    setClientData((prevProduct) => ({
      ...prevProduct,
      [imageIndexAttr]: undefined,
    }));
  };

  function handleAcceptedFiles(files, imageIndexAttr = "imagenUno") {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setClientData((prevClient) => ({
      ...prevClient,
      [imageIndexAttr]: files[0],
    }));
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  let productOptions = products.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <Form>
      <CardTitle>Información del cliente</CardTitle>
      <CardSubtitle className="mb-3">
        Ingresa la información en los siguientes campos:{" "}
      </CardSubtitle>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label className="control-label">Nombre</Label>
            <Input
              defaultValue={cliente && cliente.name ? cliente.name : ""}
              id="name"
              name="name"
              type="name"
              className="form-control"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label className="control-label">Email</Label>
            <Input
              disabled={cliente.hasOwnProperty("id")}
              defaultValue={cliente && cliente.email ? cliente.email : ""}
              id="email"
              name="email"
              type="email"
              className="form-control"
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="control-label">Password</Label>
            <Input
              disabled={cliente.hasOwnProperty("id")}
              defaultValue={cliente && cliente.password ? cliente.password : ""}
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
          </FormGroup>
        </Col>
      </Row>
      <CardTitle>Información de productos</CardTitle>
      <CardSubtitle className="mb-3">
        Ingresa la información en los siguientes campos:{" "}
      </CardSubtitle>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label className="control-label">Producto 1</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              title="Producto 1"
              options={productOptions}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label htmlFor="preciouno">Precio</Label>
            <Input
              id="precioUno"
              name="precioUno"
              type="number"
              onChange={handleNumberChange}
              min={0}
              className="form-control"
              defaultValue={+clientData.precioUno || ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <CardTitle className="mb-3">Imagen de producto 1</CardTitle>
      <FormGroup>
        <Dropzone
          accept="image/*"
          onDrop={(acceptedFiles) => {
            handleAcceptedFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
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
        <div className="dropzone-previews mt-3" id="file-previews">
          {clientData.imagenUno && (
            <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={clientData.imagenUno.name}
                      src={clientData.imagenUno.preview || clientData.imagenUno}
                    />
                  </Col>
                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {clientData.imagenUno.name ||
                        "Imagen guardada en servidor"}
                    </Link>
                    <p className="mb-0">
                      <strong>{clientData.imagenUno.formattedSize}</strong>
                    </p>
                  </Col>
                  <Col className="col-auto">
                    <i
                      className="text-danger mdi mdi-close font-size-18 mr-3"
                      id="deletetooltip"
                      onClick={() => deleteImg("imagenUno")}
                    ></i>
                  </Col>
                </Row>
              </div>
            </Card>
          )}
        </div>
      </FormGroup>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label className="control-label">Producto 2</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              title="Producto 2"
              options={productOptions}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label htmlFor="preciodos">Precio 2</Label>
            <Input
              id="preciodos"
              name="precioDos"
              type="number"
              onChange={handleNumberChange}
              min={0}
              className="form-control"
              defaultValue={+clientData.precioDos || ""}
            />
          </FormGroup>
        </Col>
      </Row>
      <CardTitle className="mb-3">Imagen de producto 2</CardTitle>
      <FormGroup>
        <Dropzone
          accept="image/*"
          onDrop={(acceptedFiles) => {
            handleAcceptedFiles(acceptedFiles, "imagenDos");
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
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
        <div className="dropzone-previews mt-3" id="file-previews">
          {clientData.imagenDos && (
            <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={clientData.imagenDos.name}
                      src={clientData.imagenDos.preview || clientData.imagenDos}
                    />
                  </Col>
                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {clientData.imagenDos.name ||
                        "Imagen guardada en servidor"}
                    </Link>
                    <p className="mb-0">
                      <strong>{clientData.imagenDos.formattedSize}</strong>
                    </p>
                  </Col>
                  <Col className="col-auto">
                    <i
                      className="text-danger mdi mdi-close font-size-18 mr-3"
                      id="deletetooltip"
                      onClick={() => deleteImg("imagenDos")}
                    ></i>
                  </Col>
                </Row>
              </div>
            </Card>
          )}
        </div>
      </FormGroup>
      <Row className="justify-content-end">
        <Button
          color="primary"
          className="mr-1 waves-effect waves-light"
          onClick={onSubmit}
        >
          Save Changes
        </Button>
        <Button
          color="secondary"
          className="waves-effect"
          onClick={returnToProducts}
        >
          Cancel
        </Button>
      </Row>
    </Form>
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
)(ClientForm);
