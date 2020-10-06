import React from "react";
import { Button, PageHeader, Row, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditOutlined } from "@ant-design/icons";
import Container from "../../common/container";

const Productos = ({ history, productData }) => {
    
    const editProduct = (record) => history.push('/productos/edit', record);

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Precio",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "Tags",
            dataIndex: "tag",
            key: "tag",
            render: (text, record) => (
                <div>
                    {record.tag.map((tag, i) =>
                        <Tag key={i} color="blue">{tag}</Tag>
                    )}
                </div>
            )
        },
        {
            title: "Categoría",
            dataIndex: "category",
            key: "category",
            render: (text, record) => (
                <div>
                    {record.category.map((category, i) =>
                        <Tag key={i} color="magenta">{category}</Tag>
                    )}
                </div>
            )
        },
        {
            title: "Editar",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Button onClick={() => editProduct(record)}>
                    <EditOutlined />
                </Button>
            ),
        },
    ];


    if (productData === undefined) {
        return null;
    }
    return (
        <div>
            <PageHeader title="Productos" />
            <Container>
                <Row justify="end" style={{ marginBottom: "10px" }}>
                    <Link to="/productos/new">
                        <Button type="primary">Nuevo producto</Button>
                    </Link>
                </Row>
                <Table rowKey='id' columns={columns} dataSource={productData} />
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => ({
    productData: state.firestore.ordered.Products,
});

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "Products" }])
)(Productos);
