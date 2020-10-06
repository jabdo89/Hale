import React from "react";
import Container from "../../../common/container";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "firebase";
import { Button, PageHeader, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Cupones = ({ history, couponData }) => {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Edit",
      render: (text, record) => (
        <Button onClick={() => editCoupon(record)}>
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: "Delete",
      render: (text, record) => (
        <Popconfirm
          cancelText="Cancelar"
          okText="Confirmo"
          title="¿Desea eliminar este cupón?"
          onConfirm={() => deleteCoupon(record)}
        >
          <Button>
            <DeleteOutlined style={{ color: "#F75760" }} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const deleteCoupon = (record) => {
    const db = firebase.firestore();
    console.log(record);
    db.collection("Coupons").doc(record.id).delete();
  };

  const editCoupon = (record) => history.push("/cupones/edit", record);

  return (
    <div>
      <PageHeader title="Cupones" />
      <Container>
        <Row justify="end" style={{ marginBottom: "10px" }}>
          <Link to="/cupones/new">
            <Button type="primary">Nuevo cupón</Button>
          </Link>
        </Row>
        <Table rowKey="id" columns={columns} dataSource={couponData} />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  couponData: state.firestore.ordered.Coupons,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Coupons" }])
)(Cupones);
