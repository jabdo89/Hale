import React from "react";
import Container from "../../../common/container";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Button, PageHeader, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sliders = ({ history, sliderData }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Edit",
      render: (text, record) => (
        <Button onClick={() => editSlider(record)}>
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
          title="¿Desea eliminar este slider?"
          onConfirm={() => deleteSlider(record)}
        >
          <Button>
            <DeleteOutlined style={{ color: "#F75760" }} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const deleteSlider = (record) => {
    console.log("Deleting slider", record);
  };

  const editSlider = (record) => history.push("/sliders/edit", record);

  return (
    <div>
      <PageHeader title="Sliders" />
      <Container>
        <Row justify="end" style={{ marginBottom: "10px" }}>
          <Link to="/sliders/new">
            <Button type="primary">Nuevo slider</Button>
          </Link>
        </Row>
        <Table rowKey="id" columns={columns} dataSource={sliderData} />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sliderData: state.firestore.ordered.Sliders,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Sliders" }])
)(Sliders);
