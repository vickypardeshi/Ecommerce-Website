import React, { useState } from 'react';
import {
    Container, Row, Col, Table, 
    Spinner, Button
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import FormInput from '../components/common/FormInput';
import { 
    addProduct, deleteProductById, 
    getInitialData,
} from '../store/actions/action';
import CustomModal from '../components/common/CustomModal';
import { generatePublicUrl } from '../api/url';
import ErrorHandler from '../components/common/ErrorHandler';
import '../styles/product.css'


const Products = () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);

    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const { loading, error } = product;

    const dispatch = useDispatch();

    const handleClose = () => {
        setName('');
        setQuantity('');
        setPrice('');
        setDescription('');
        setCategoryId('');
        setProductPictures([]);

        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0],
        ]);
    }

    const handleSubmit = () => {
        if(name === ''){
            //alert('Name required');
            setShow(false);
            return;
        }
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let picture of productPictures) {
            form.append('productPicture', picture);
        }

        dispatch(addProduct(form));

        setName('');
        setQuantity('');
        setPrice('');
        setDescription('');
        setCategoryId('');
        setProductPictures([]);

        setShow(false);
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const retryLogic = () => {
        dispatch(getInitialData());
    }

    const createNewProductBody = (
        <>
            <FormInput
                label="Name"
                value={name}
                placeholder={'Product Name'}
                onChange={(e) => setName(e.target.value)}
            />
            <FormInput
                label="Quantity"
                value={quantity}
                placeholder={'Product Quantity'}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <FormInput
                label="Price"
                value={price}
                placeholder={'Product Price'}
                onChange={(e) => setPrice(e.target.value)}
            />
            <FormInput
                label="Description"
                value={description}
                placeholder={'Product Description'}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormInput
                inputType="select"
                placeholder={'Select Category'}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                options={createCategoryList(category.categories)}
            />
            {
                productPictures.length > 0
                    ? productPictures.map((pic, index) =>
                        <div key={index}>{pic.name}</div>
                    )
                    : null
            }
            <input
                type="file"
                name="productPictures"
                onChange={handleProductPictures}
            />
        </>
    );

    const productDetailsBody = (
        <>
            {!!productDetails ?
                <Container>
                    <Row>
                        <Col md={6}>
                            <label className="key">Name</label>
                            <p className="value">{productDetails.name}</p>
                        </Col>
                        <Col md={6}>
                            <label className="key">Price</label>
                            <p className="value">{productDetails.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label className="key">Quantity</label>
                            <p className="value">{productDetails.quantity}</p>
                        </Col>
                        <Col md={6}>
                            <label className="key">Category</label>
                            <p className="value">{productDetails.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <label className="key">Description</label>
                            <p className="value">{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className="key">Product Pictures</label>
                            <div className="picture-container">
                                {
                                    productDetails.productPictures.map(picture =>
                                        <div className="picture">
                                            <img src={generatePublicUrl(picture.img)} alt="" />
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                null
            }
        </>
    );

    const renderProducts = () => {
        return (
            <Table className="table" responsive="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product =>
                                <tr key={product._id}>
                                    <td>#</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                showProductDetailsModal(product)
                                            }}
                                        >
                                            VIEW
                                        </Button>
                                        {/* <Button 
                                            onClick={() => {
                                                showProductDetailsModal(product)
                                            }}
                                        >
                                            EDIT
                                        </Button>
                                        &nbsp; */}
                                        <Button
                                            className="mx-1" 
                                            onClick={() => {
                                                const payload = {
                                                    productId: product._id,
                                                };
                                                dispatch(deleteProductById(payload));
                                            }}
                                        >
                                            DELETE
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </Table>
        );
    }

    if (loading) {
        return (
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col
                            className="text-center py-3"
                        >
                            <Spinner
                                variant="primary"
                                animation="border"
                            />
                        </Col>
                    </Row>
                </Container>
            </Layout>

        );
    }

    if(error){
        return(
            <Layout sidebar>
                <ErrorHandler
                    retryLogic={retryLogic} 
                    //errorMessage={error.message}
                />
            </Layout>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row className="my-2">
                    <Col md={12}>
                        <div className="product">
                            <h3>Products</h3>
                            <Button
                                className="mx-2 fs-1 "
                                onClick={handleShow}
                            >
                                Add Product
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>

            <CustomModal
                title={'Add New Product'}
                show={show}
                body={createNewProductBody}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                button={'Save'}
            />

            <CustomModal
                title={'Product Details'}
                show={productDetailsModal}
                body={productDetailsBody}
                handleClose={handleCloseProductDetailsModal}
                handleSubmit={handleCloseProductDetailsModal}
                size="lg"
                button={'Close'}
            />
        </Layout>
    );
}

export default Products;
