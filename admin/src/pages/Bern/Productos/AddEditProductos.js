import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const ProductForm = ({ producto = {}, categories = {}, tags = {} }) => {

    const history = useHistory();

    const returnToProducts = () => {
        history.push('/productos');
    }

    const [productData, setProductData] = useState(producto);

    useEffect(() => setProductData(producto), [producto]);


    const onSubmit = (e) => {
        e.preventDefault();
        console.log('updating/creating product', productData);
    }

    const handleTextChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductData(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const handleCheckChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        console.log('changing check value', name, value)

        setProductData(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const handleNumberChange = (e) => {
        if (e.target.type === 'number') {
            if (e.target.max) e.target.value = Math.min(+e.target.max, +e.target.value);
            if (e.target.min) e.target.value = Math.max(+e.target.min, +e.target.value);
        }

        const name = e.target.name;
        const value = +e.target.value;
        setProductData(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const handleCategoryChange = (v) => {
        console.log('new values in category', v);

        const newCategories = v ? v.map(c => c.value) : [];

        setProductData(prevProduct => ({
            ...prevProduct,
            category: newCategories
        }))
    }

    const handleTagChange = (v) => {
        console.log('new values in tag', v);

        const newTags = v ? v.map(t => t.value) : [];

        setProductData(prevProduct => ({
            ...prevProduct,
            tag: newTags
        }))
    }

    const deleteImg = (img) => {

        let images = [...productData.image]; // make a separate copy of the array
        let index = images.indexOf(img)
        if (index !== -1) {
            images.splice(index, 1);
            setProductData(prevProduct => ({
                ...prevProduct,
                image: images
            }))
        }
    }

    function handleAcceptedFiles(files) {
        files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size)
        }));

        setProductData(prevProduct => ({
            ...prevProduct,
            image: prevProduct.image ? [...prevProduct.image, ...files] : files
        }))
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    let categoryOptions = Object.keys(categories).map(c => ({ value: c, label: c }));
    let tagOptions = Object.keys(tags).map(t => ({ value: t, label: t }));

    return (
        <Form>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label htmlFor="productname">Nombre de producto</Label>
                        <Input id="productname" name="productname" type="text" onChange={handleTextChange} className="form-control"
                            defaultValue={productData.name || ''}
                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <h5 className="font-size-14">¿Producto Nuevo?</h5>
                        <div className="form-check mt-3 mb-3">
                            <input className="form-check-input" name="new" type="checkbox"
                                checked={productData.new || false}
                                onChange={handleCheckChange}
                                id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Nuevo
                            </label>
                        </div>
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" name="sku" type="text" onChange={handleTextChange} className="form-control"
                            defaultValue={productData.sku || ''}
                        />
                    </FormGroup>
                </Col>
                <Col sm="12">
                    <FormGroup>
                        <Label htmlFor="productdesc">Descripción corta de producto</Label>
                        <textarea className="form-control" name="shortDescription" id="productdesc" rows="1"
                            onChange={handleTextChange}
                            defaultValue={productData.shortDescription || ''}
                        />
                    </FormGroup>
                </Col>
                <Col sm="12">
                    <FormGroup>
                        <Label htmlFor="productfulldesc">Descripción completa de producto</Label>
                        <textarea className="form-control" name="fullDescription" id="productfulldesc" rows="5"
                            onChange={handleTextChange}
                            defaultValue={productData.fullDescription || ''}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label className="control-label">Categoría(s)</Label>
                        <Select classNamePrefix="select2-selection" placeholder="Choose..." title="Category" options={categoryOptions} isMulti
                            value={productData.category ? productData.category.map(c => ({ value: c, label: c })) : []}
                            onChange={handleCategoryChange}
                            onInputChange={v => console.log('input change', v)}
                            onKeyDown={k => { if (k.key === 'Enter' || k.key === ',') console.log('keydown', k.key) }}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label className="control-label">Tags</Label>
                        <Select classNamePrefix="select2-selection" placeholder="Choose..." title="Tags" options={tagOptions} isMulti
                            onChange={handleTagChange}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label htmlFor="productprice">Precio de producto</Label>
                        <Input id="productprice" name="price" type="number" onChange={handleNumberChange} min={0} className="form-control"
                            defaultValue={+productData.price || ''}
                        />
                    </FormGroup>
                </Col>
                <Col sm="6">
                    <FormGroup>
                        <Label htmlFor="productstock">Stock</Label>
                        <Input id="productstock" name="stock" type="number" onChange={handleNumberChange} min={0} className="form-control"
                            defaultValue={+productData.stock || ''}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <CardTitle className="mb-3">Imágenes de producto</CardTitle>
            <FormGroup>
                <Dropzone
                    accept='image/*'
                    onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles) }
                    }
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                            <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <div className="dz-message needsclick">
                                    <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                    </div>
                                    <h4>Drop files here or click to upload.</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <div
                    className="dropzone-previews mt-3"
                    id="file-previews"
                >
                    {productData.image && productData.image.map((f, i) => {
                        return (
                            <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                            >
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className="avatar-sm rounded bg-light"
                                                alt={f.name}
                                                src={f.preview || f}
                                            />
                                        </Col>
                                        <Col>
                                            <Link
                                                to="#"
                                                className="text-muted font-weight-bold"
                                            >
                                                {f.name || 'Imagen guardada en servidor'}
                                            </Link>
                                            <p className="mb-0">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </Col>
                                        <Col className="col-auto">
                                            <i
                                                className="text-danger mdi mdi-close font-size-18 mr-3"
                                                id="deletetooltip"
                                                onClick={() => deleteImg(f)}
                                            ></i>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </FormGroup>
            <Row className="justify-content-end">
                <Button color="primary" className="mr-1 waves-effect waves-light" onClick={onSubmit}>Save Changes</Button>
                <Button color="secondary" className="waves-effect" onClick={returnToProducts}>Cancel</Button>
            </Row>
        </Form>
    );
}

const reducerGen = (attr) => {
    return (acc, curr) => {
        if (curr && curr[attr]) {
            curr[attr].forEach(el => {
                if (!acc[el]) acc[el] = true;
            });
        }
        return acc;
    }
}

const AddEditProductos = ({ location, products }) => {

    const productID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const product = products ? (products.find(x => x.id === productID) || {}) : {};
    const catFilter = reducerGen('category');
    const tagFilter = reducerGen('tag');

    const categories = products ? products.reduce(catFilter, {}) : {};
    const tags = products ? products.reduce(tagFilter, {}) : {};

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Productos" breadcrumbItem={`${product.id ? 'Editar' : 'Añadir'} Producto`} />
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>

                                    <CardTitle>Información del producto</CardTitle>
                                    <CardSubtitle className="mb-3">Ingresa la información en los siguientes campos: </CardSubtitle>
                                    <ProductForm producto={product} categories={categories} tags={tags} />
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
        products: state.firestore.ordered.Products,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: "Products",
            },
        ];
    })
)(AddEditProductos);