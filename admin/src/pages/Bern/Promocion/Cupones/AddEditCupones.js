import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';

const CouponForm = ({ coupon }) => {

    const history = useHistory();
    
    const returnToCoupons = () => {
        history.push('/promocion-cupones');
    }

    const [couponData, setCouponData] = useState(coupon || {});

    useEffect(() => setCouponData(coupon), [coupon]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('updating/creating coupon', couponData);
    }

    const handleTextChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCouponData(prevCoupon => ({
            ...prevCoupon,
            [name]: value
        }));
    }

    const handleNumberChange = (e) => {
        if(e.target.type === 'number') {
          if(e.target.max) e.target.value = Math.min(+e.target.max, +e.target.value ); 
          if(e.target.min) e.target.value = Math.max(+e.target.min, +e.target.value ); 
        }

        let name = e.target.name;
        let value = +e.target.value;
        setCouponData(prevCoupon => ({
            ...prevCoupon,
            [name]: value
        }));
      }
    
    return (
        <Form>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label htmlFor="slidertitle">Código de cupón</Label>
                        <Input id="couponcode" name="code" type="text" className="form-control"
                            defaultValue={coupon.code || ''}
                            onChange={handleTextChange}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label htmlFor="slidertitle">Descuento de cupón</Label>
                        <Input id="coupondisc" name="discount" type="number" min={0} max={100} className="form-control"
                            defaultValue={coupon.discount || ''}
                            onChange={handleNumberChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Button type="submit" color="primary" className="mr-1 waves-effect waves-light" onClick={onSubmit}>Save Changes</Button>
                <Button color="secondary" className="waves-effect" onClick={returnToCoupons}>Cancel</Button>
            </Row>
        </Form>
    )

}

const AddEditCupones = ({ location, cupones }) => {

    const couponID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const coupon = cupones && cupones.find(x => x.id === couponID) || {};
    const isEditing = coupon !== {};



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Promoción" breadcrumbItem={`${isEditing ? 'Editar' : 'Añadir'} Cupón`} />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del cupón</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>
                                    <CouponForm coupon={coupon} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
}

const mapStateToProps = (state) => {
    return {
        cupones: state.firestore.ordered.Coupons,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: "Coupons",
            },
        ];
    })
)(AddEditCupones);