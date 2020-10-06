import React from "react";
import { PageHeader } from "antd";
import Container from "../../../common/container";
import SliderForm from "./sliderForm";
import { Redirect } from "react-router-dom";

const EditSlider = ({ history, location}) => {

    const { state: slider} = location;
    
    if(!slider) return <Redirect to='/sliders'/>
    return (
        <div>
            <PageHeader title="Editar slider" onBack={() => history.push('/sliders')} />
            <Container>
                <SliderForm isEditing slider={slider}/>
            </Container>
        </div >
    );
};

export default EditSlider;