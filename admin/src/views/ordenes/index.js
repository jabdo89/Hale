import React from "react";
import { Button, PageHeader, Row, Table, Tag } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Container from "../../common/container";

const columns = [
    {
        title: "Nombre",
        key: "firstName",
        render: (text, record) => (
            record.firstName + ' ' + record.lastname
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: "Items",
        dataIndex: "items",
        key: "items",
        render: (text, record) => (
            <div>
                {record.items.map((item, i) =>
                    <Tag key={i} color="magenta">{item.name}</Tag>
                )}
            </div>
        )
    },
    {
        title: "Precio",
        dataIndex: "price",
        key: "price",
    },
];

const Ordenes = ({ ordersData }) => {

    if (ordersData === undefined) {
        return null;
    }
    return (
        <div>
            <PageHeader title="Órdenes" />
            <Container>
                <Row justify="end" style={{ marginBottom: "10px" }}>
                    <Button type="primary">Nueva órden</Button>
                </Row>
                <Table rowKey='id' columns={columns} dataSource={ordersData} />
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => ({
    ordersData: state.firestore.ordered.Orders,
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "Orders" }])
)(Ordenes);