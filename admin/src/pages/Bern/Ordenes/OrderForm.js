import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, FormGroup, Input, Button, Label } from "reactstrap";

const OrderForm = ({ orden = {}, productOptions = [] }) => {
  const history = useHistory();

  console.log('orden', orden)

  const returnToOrders = () => {
    history.push("/ordenes");
  };

  const [orderData, setOrderData] = useState({ ...orden, date: new Date() });

  useEffect(() => setOrderData({ ...orden, date: new Date() }), [orden]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("updating/creating order", orderData);
  };

  const handleTextChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderData((prevOrder) => ({
      ...prevOrder,
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
    setOrderData((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    const newDate = new Date(rawDate);
    setOrderData((prevOrder) => ({
      ...prevOrder,
      date: newDate,
    }));
  };

  const defaultDate = (date = new Date()) => {
    return (
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0)
    );
  };

  const calcOrderTotal = (items) => {
    if (!items) return 0;

    return items.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0) * (parseFloat(curr.quantity) || 0), 0);
  };

  return (
    <Form>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.name || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.email || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.phone || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="2">
          <FormGroup>
            <Label htmlFor="apartmentNum"># de depto.</Label>
            <Input
              id="apartmentNum"
              name="apartmentNum"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.apartmentNum || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              name="city"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.city || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              name="state"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.state || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label htmlFor="street">Calle</Label>
            <Input
              id="street"
              name="street"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.street || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="2">
          <FormGroup>
            <Label htmlFor="zipcode">Código Postal</Label>
            <Input
              id="zipcode"
              name="zipcode"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.zipcode || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label htmlFor="date">Fecha</Label>
            <Input
              className="form-control"
              type="date"
              name="date"
              defaultValue={defaultDate(orderData.date)} // TODO: Fix bug, not taking initial date from order
              onChange={handleDateChange}
              id="date"
            />
          </FormGroup>
        </Col>
        {/* <Col sm="3">
          <FormGroup>
            <Label htmlFor="currencyName">Currency Name</Label>
            <Input
              id="currencyName"
              name="currencyName"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.currencyName || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label htmlFor="currencyRate">Currency Rate</Label>
            <Input
              id="currencyRate"
              name="currencyRate"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.currencyRate || ""}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label htmlFor="currencySymbol">Currency Symbol</Label>
            <Input
              id="currencySymbol"
              name="currencySymbol"
              type="text"
              onChange={handleTextChange}
              className="form-control"
              defaultValue={orderData.currencySymbol || ""}
            />
          </FormGroup>
        </Col> */}
        <Col sm="9">
          <Label>Productos</Label>
          {/* <FormGroup>
            <Row className="ml-1">
              <Label>Producto 1</Label>
              <Col sm="6">
                <Input id="item1" name="item1" />
              </Col>
              <Label>Cantidad</Label>
              <Col sm="3">
                <Input id="cantidad1" name="cantidad1" />
              </Col>
            </Row>
          </FormGroup> */}
        </Col>
        <Col sm="12">
          <Label>
            Total: {calcOrderTotal(orderData.items) ?? 0}
          </Label>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Button
          color="primary"
          className="mr-1 waves-effect waves-light"
          onClick={onSubmit}
        >
          Guardar cambios
        </Button>
        <Button
          color="secondary"
          className="waves-effect"
          onClick={returnToOrders}
        >
          Cancelar
        </Button>
      </Row>
    </Form>
  );
};

export default OrderForm;
