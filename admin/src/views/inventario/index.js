import React, { useState } from "react";
import { Button, Form, InputNumber, Modal, PageHeader, Row, Table, Tag } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Container from "../../common/container";

const Inventario = ({ productData }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
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
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Edit",
            render: (text, record) => (
                <Button onClick={() => editInventory(record)}>
                    <EditOutlined />
                </Button>
            ),
        },
    ];

    const editInventory = record => {
        setShowEdit(true);
        setSelectedItem(record);
    }

    const onFinish = values => {
        console.log(values);
        setShowEdit(false);
    }

    if (productData === undefined) {
        return null;
    }
    return (
        <div>
            <PageHeader title="Inventario" />
            <Container>
                <Modal
                    title="Edit inventory"
                    visible={showEdit}
                    footer={null}
                    onCancel={() => setShowEdit(false)}
                >
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="stock"
                            label="Stock"
                            initialValue={selectedItem.stock || ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input stock!",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ minWidth: 150 }}
                                min={0}
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
                </Modal>
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
)(Inventario);
