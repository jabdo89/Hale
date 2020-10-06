import React from "react";
import { PageHeader } from "antd";
import Container from "../../common/container";
import ProductForm from "./productForm";

const NewProducto = ({ history}) => {

    return (
        <div>
            <PageHeader title="Nuevo producto" onBack={() => history.push('/productos')} />
            <Container>
                <ProductForm/>
            </Container>
        </div >
    );
};

export default NewProducto;