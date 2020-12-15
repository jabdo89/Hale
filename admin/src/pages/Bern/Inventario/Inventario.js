import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import image from "./clipboard.png";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const InventoryDetailModal = ({ product, isOpen, setmodal }) => {
  const [stock, setStock] = useState(product.stock || 0);

  useEffect(() => setStock(+product.stock || 0), [product]);

  const updateInventory = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("Products").doc(product.id).update({ stock: stock });
    setmodal(!isOpen);
  };

  const handleChange = (e) => {
    if (e.target.type === "number") {
      if (e.target.max)
        e.target.value = Math.min(+e.target.max, +e.target.value);
      if (e.target.min)
        e.target.value = Math.max(+e.target.min, +e.target.value);
    }
    setStock(+e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      toggle={() => {
        setmodal(!isOpen);
      }}
    >
      <div className="modal-content">
        <ModalHeader
          toggle={() => {
            setmodal(!isOpen);
          }}
        >
          Order Details
        </ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Product ID: <span className="text-primary">#{product.id}</span>
          </p>
          <Form>
            <FormGroup>
              <Label htmlFor="stock">Inventario</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                className="form-control"
                defaultValue={product.stock ? product.stock : 0}
                min={0}
                onChange={handleChange}
              />
            </FormGroup>
            <Row className="justify-content-end">
              <Button
                type="submit"
                color="primary"
                className="mr-1 waves-effect waves-light"
                onClick={updateInventory}
              >
                Save Changes
              </Button>
              <Button
                color="secondary"
                className="waves-effect"
                onClick={() => setmodal(!isOpen)}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  );
};

const Inventario = ({ products }) => {
  const [modal, setmodal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventario" breadcrumbItem="Inventario" />
          <Row>
            {products &&
              products.map((product, idx) => (
                <Col key={idx} xl="4" sm="6">
                  <Card>
                    <Row>
                      <Col xl="5">
                        <div className="text-center p-4 border-right">
                          <div className="avatar-md mx-auto mb-4">
                            <span className="avatar-title waves-effect rounded-circle bg-light text-danger font-size-16">
                              <img src={image} alt="" height="90" />
                            </span>
                          </div>
                          <h5 className="text-truncate">{product.name}</h5>
                        </div>
                      </Col>

                      <Col xl="7">
                        <div className="p-4 text-center text-xl-left">
                          <Row>
                            <Col md="12">
                              <div>
                                <p className="text-muted mb-2 text-truncate">
                                  Stock
                                </p>
                                <h5>{product.stock}</h5>
                              </div>
                            </Col>
                          </Row>
                          <div className="mt-4">
                            <Button
                              type="button"
                              color="primary"
                              className="btn-sm btn-rounded"
                              onClick={() => {
                                setModalProduct(product);
                                setmodal(!modal);
                              }}
                            >
                              Editar inventario
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
      <InventoryDetailModal
        product={modalProduct}
        isOpen={modal}
        setmodal={setmodal}
      />
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
)(Inventario);
