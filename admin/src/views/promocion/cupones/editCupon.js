import React from "react";
import { PageHeader } from "antd";
import Container from "../../../common/container";
import CuponForm from "./cuponForm";
import { Redirect } from "react-router-dom";

const EditCupon = ({ history, location}) => {

    const { state: coupon} = location;
    
    if(!coupon) return <Redirect to='/cupones'/>
    return (
        <div>
            <PageHeader title="Editar cupón" onBack={() => history.push('/cupones')} />
            <Container>
                <CuponForm isEditing coupon={coupon}/>
            </Container>
        </div >
    );
};

export default EditCupon;