import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../../components/Common/Breadcrumb';

const AddEditCupones = ({ location, cupones }) => {

    const history = useHistory();

    const couponID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const coupon = cupones && cupones.find(x => x.id === couponID) || {};
    const isEditing = couponID !== 'new' && coupon !== {};

    const returnToCoupons = () => {
        history.push('/promocion-cupones');
    }

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

                                    <Form>
                                        <Row>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="slidertitle">Código de cupón</Label>
                                                    <Input id="couponcode" name="couponcode" type="text" className="form-control"
                                                        defaultValue={(isEditing) ? coupon.code : ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="slidertitle">Descuento de cupón</Label>
                                                    <Input id="coupondisc" name="coupondisc" type="number" min={0} max={100} className="form-control"
                                                        defaultValue={(isEditing) ? coupon.discount : ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-end">
                                            <Button type="submit" color="primary" className="mr-1 waves-effect waves-light">Save Changes</Button>
                                            <Button type="submit" color="secondary" className="waves-effect" onClick={returnToCoupons}>Cancel</Button>
                                        </Row>
                                    </Form>
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