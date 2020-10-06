import React from "react";
import { PageHeader } from "antd";
import Container from "../../../common/container";
import SliderForm from "./sliderForm";

const NewSlider = ({ history }) => {

    return (
        <div>
            <PageHeader title="Nuevo Slider" onBack={() => history.push('/sliders')} />
            <Container>
                <SliderForm/>
            </Container>
        </div >
    );
};

export default NewSlider;