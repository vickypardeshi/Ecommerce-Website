import React, { useState } from 'react';
import {
    Container, Row, Col, Table
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import FormInput from '../components/common/FormInput';
import { addProduct } from '../store/actions/action';
import CustomModal from '../components/common/CustomModal';
import '../styles/product.css'
import { generatePublicUrl } from '../api/url';

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
            <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option>Select Category</option>
                {
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    )
                }
            </select>
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
                                            <img src={generatePublicUrl(picture.img)} alt=""/>
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
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product =>
                                <tr onClick={() => {
                                    showProductDetailsModal(product)
                                }} key={product._id}>
                                    <td>#</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>--</td>
                                    {/* <td>{product.category.name}</td> */}
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </Table>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="product">
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
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
                buttonName={'Save'}
            />

            <CustomModal
                title={'Product Details'}
                show={productDetailsModal}
                body={productDetailsBody}
                handleClose={handleCloseProductDetailsModal}
                handleSubmit={handleCloseProductDetailsModal}
                size="lg"
                buttonName={'Close'}
            />
        </Layout>
    );
}

export default Products;