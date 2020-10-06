import React, { Component } from "react";
import firebase from "firebase";
import {
    Card,
    Form,
    Input,
    Button,
    Divider,
    Typography,
    Layout
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Item } = Form;
const { Title, Text } = Typography;
const { Content } = Layout;

const LoginLayout = ({ children }) => (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </Content>
    </Layout>
);

const Login = () => {
    const onFinish = (values) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LoginLayout>
            <Title style={{ color: "#369BFA" }}>
                BernPress
        </Title>
            <Card style={{ minWidth: '450px' }}>
                <Form onFinish={onFinish}>
                    <Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "Ingresa un correo válido",
                            },
                            { required: true, message: "Ingresa tu email" },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Item>
                    <Item
                        style={{ marginTop: 10 }}
                        name="password"
                        rules={[{ required: true, message: "Ingresa tu password" }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Item>
                    <Item style={{ marginTop: 20 }}>
                        <Button block type="primary" htmlType="submit">
                            Log in
              </Button>
                    </Item>
                </Form>
                {/* <Divider>
                    <Text style={{ fontSize: 10 }} type="secondary">
                        ¿Aún no tienes una cuenta?
            </Text>
                </Divider> */}
            </Card>
        </LoginLayout>
    );
}

export default Login;