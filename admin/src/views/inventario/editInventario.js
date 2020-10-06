import React from "react";
import { Button, Form, Input, PageHeader, Space } from "antd";
import Container from "../../common/container";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const EditInventario = ({ history }) => {
  return (
    <div>
      <PageHeader
        title="Añadir inventario"
        onBack={() => history.push("/inventario")}
      />
      <Container>
        <Form layout="vertical">
          <Form.List name="users">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "first"]}
                        fieldKey={[field.fieldKey, "first"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input placeholder="Product" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "last"]}
                        fieldKey={[field.fieldKey, "last"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Input placeholder="How much stock arrived?" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default EditInventario;
