import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, InputNumber, Row } from "antd";
import firebase from "firebase";
import { ContainerOutlined } from "@ant-design/icons";

const CuponForm = ({ coupon = {}, isEditing = false }) => {
  const history = useHistory();

  const onFinish = (info) => {
    console.log(info);
    const db = firebase.firestore();
    db.collection("Coupons")
      .add({
        code: info.code,
        discount: info.discount,
      })
      .then(() => {
        history.push("/cupones");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="code"
        label="Name"
        initialValue={coupon.code || ""}
        rules={[
          {
            required: true,
            message: "Please input coupon code!",
          },
        ]}
      >
        <Input
          prefix={<ContainerOutlined />}
          placeholder="Please input coupon name"
        />
      </Form.Item>
      <Form.Item
        name="discount"
        label="Discount"
        initialValue={coupon.discount || ""}
        rules={[
          {
            required: true,
            message: "Please input coupon discount!",
          },
        ]}
      >
        <InputNumber
          style={{ minWidth: 150 }}
          formatter={(value) =>
            `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          min={0}
          max={100}
        />
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CuponForm;
