import React from "react";
import { PageHeader } from "antd";
import Container from "../../common/container";
import ProductForm from "./productForm";
import { Redirect } from "react-router-dom";

const EditProducto = ({ history, location}) => {

    const { state: product} = location;
    
    if(!product) return <Redirect to='/productos'/>
    return (
        <div>
            <PageHeader title="Editar producto" onBack={() => history.push('/productos')} />
            <Container>
                <ProductForm isEditing product={product}/>
            </Container>
        </div >
    );
};

export default EditProducto;