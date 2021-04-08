import React, { useState } from 'react';
import {
    Container, Row, Col, Table
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import FormInput from '../components/common/FormInput';
import { addProduct } from '../store/actions/product.action';
import CustomModal from '../components/common/CustomModal';


const Products = () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);

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

    const body = (
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

    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product =>
                                <tr key={product._id}>
                                    <td>id</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.decription}</td>
                                    <td>--</td>
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
                        <div className="category">
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
                body={body}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Layout>
    );
}

export default Products;