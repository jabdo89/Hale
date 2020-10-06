import React from "react";
import Container from "../../common/container";
import { PageHeader, Table } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const columns = [
  {
    title: "Name",
    key: "firstName",
    render: (text, record) => record.firstName + " " + record.lastName,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Total Spent",
    dataIndex: "totalSpent",
    key: "totalSpent",
  },
];

const Clientes = ({ ordersData: clientsData }) => {
  if (clientsData === undefined) {
    return null;
  }
  return (
    <div>
      <PageHeader title="Clientes" />
      <Container>
        <Table rowKey="id" columns={columns} dataSource={clientsData} />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordersData: state.firestore.ordered.Clients,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Clients" }])
)(Clientes);
