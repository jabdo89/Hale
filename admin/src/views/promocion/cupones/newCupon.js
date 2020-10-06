import React from "react";
import { PageHeader } from "antd";
import Container from "../../../common/container";
import CuponForm from "./cuponForm";

const NewCupon = ({ history }) => {

    return (
        <div>
            <PageHeader title="Nuevo Cupón" onBack={() => history.push('/cupones')} />
            <Container>
                <CuponForm/>
            </Container>
        </div >
    );
};

export default NewCupon;