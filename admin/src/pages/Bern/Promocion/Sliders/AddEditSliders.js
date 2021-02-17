import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const SliderForm = ({ slider = {} }) => {
  const history = useHistory();
  let id = history.location.pathname.substring(
    history.location.pathname.lastIndexOf("/")
  );
  const returnToSliders = () => {
    history.push("/promocion-sliders");
  };

  const [sliderData, setSliderData] = useState(slider);

  useEffect(() => {
    setSliderData(slider);
  }, [slider]);

  const onSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const storage = firebase.storage();
    console.log(sliderData);
    const imageID = uuidv4();
    if (id === "/new") {
      const uploadTaskPDF = storage
        .ref(`sliders/${imageID}`)
        .put(sliderData.image[0]);
      uploadTaskPDF.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          // Error function ...
          console.error(error);
        },
        () => {
          // complete function ...
          storage
            .ref("sliders")
            .child(imageID)
            .getDownloadURL()
            .then((url) => {
              db.collection("Sliders")
                .add({
                  title: sliderData.slidertitle,
                  image: url,
                  url: "/shop-grid-standard",
                  subtitle: sliderData.slidersub,
                })
                .then(function (docRef) {
                  history.push("/promocion-sliders");
                });
            });
        }
      );
    } else {
    }
    console.log("updating/creating slider", sliderData);
  };

  const handleTextChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSliderData((prevSlider) => ({
      ...prevSlider,
      [name]: value,
    }));
  };

  const deleteImg = (img) => {
    let images = [...sliderData.image]; // make a separate copy of the array
    let index = images.indexOf(img);
    if (index !== -1) {
      images.splice(index, 1);
      setSliderData((prevSlider) => ({
        ...prevSlider,
        image: images,
      }));
    }
  };

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setSliderData((prevSlider) => ({
      ...prevSlider,
      image: files,
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

  return (
    <Form>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label htmlFor="slidertitle">Título de slider</Label>
            <Input
              id="slidertitle"
              name="slidertitle"
              type="text"
              className="form-control"
              defaultValue={slider.title || ""}
              onChange={handleTextChange}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label htmlFor="slidertitle">Subtítulo de slider</Label>
            <Input
              id="slidersub"
              name="slidersub"
              type="text"
              className="form-control"
              defaultValue={slider.subtitle || ""}
              onChange={handleTextChange}
            />
          </FormGroup>
        </Col>
        {/* <Col sm="4">
                    <FormGroup>
                        <Label htmlFor="slidertitle">URL de slider</Label>
                        <Input id="sliderurl" name="sliderurl" type="text" className="form-control"
                            defaultValue={slider.url || ''}
                            onChange={handleTextChange}
                        />
                    </FormGroup>
                </Col> */}
      </Row>
      <CardTitle className="mb-3">Imágen de slider</CardTitle>
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
                  <h4>Arrastra archivos aquí o haz click para subir.</h4>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        <div className="dropzone-previews mt-3" id="file-previews">
          {sliderData.image &&
            [sliderData.image].map((f, i) => {
              if (Array.isArray(sliderData.image)) f = f[0];
              if (!f) return;
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
                          src={f.preview || f}
                        />
                      </Col>
                      <Col>
                        <Link to="#" className="text-muted font-weight-bold">
                          {f.name || "Imagen guardada en servidor"}
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
        <Button
          type="submit"
          color="primary"
          className="mr-1 waves-effect waves-light"
          onClick={onSubmit}
        >
          Guardar Cambios
        </Button>
        <Button
          color="secondary"
          className="waves-effect"
          onClick={returnToSliders}
        >
          Cancelar
        </Button>
      </Row>
    </Form>
  );
};

const AddEditSliders = ({ location, sliders }) => {
  const sliderID = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const slider = sliders ? sliders.find((x) => x.id === sliderID) || {} : {};
  const isEditing = sliderID !== "new" && slider !== {};

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Promoción"
            breadcrumbItem={`${isEditing ? "Editar" : "Añadir"} Slider`}
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Información del slider</CardTitle>
                  <CardSubtitle className="mb-3">
                    Ingresa la información en los siguientes campos:{" "}
                  </CardSubtitle>
                  <SliderForm slider={slider} />
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
