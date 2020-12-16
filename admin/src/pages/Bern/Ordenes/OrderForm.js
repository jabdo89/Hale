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
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderForm = ({ orden = {}, productOptions = [] }) => {
  const history = useHistory();

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

  const handleDateChange = (date) => {
    setOrderData((prevOrder) => ({
      ...prevOrder,
      date: date,
    }));
  };

  const calcOrderTotal = (items) => {
    if (!items) return 0;

    return items.reduce((acc, curr) => acc + (+curr.price * +curr.quantity), 0);
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="phone">Phone</Label>
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
        <Col sm="1">
          <FormGroup>
            <Label htmlFor="apartmentNum">Apt. #</Label>
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
            <Label htmlFor="city">City</Label>
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
        <Col sm="1">
          <FormGroup>
            <Label htmlFor="state">State</Label>
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
        <Col sm="5">
          <FormGroup>
            <Label htmlFor="street">Street</Label>
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
            <Label htmlFor="zipcode">Zipcode</Label>
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
            <Label htmlFor="date">Date</Label>
            <DatePicker
              id="date"
              name="date"
              selected={orderData.date}
              className="form-control"
              onChange={handleDateChange}
              showMonthDropdown
            />
          </FormGroup>
        </Col>
        <Col sm="3">
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
        </Col>
        <Col sm="3">
          <Label>Products</Label>
        </Col>
        <Col sm="9">
            {/* TODO: Make product select */}
        </Col>
        <Col sm="12">
          <Label>
            Total: {orderData.items ? calcOrderTotal(orderData.items) : 0}
          </Label>
        </Col>
      </Row>
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
          onClick={returnToOrders}
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
};

export default OrderForm;
