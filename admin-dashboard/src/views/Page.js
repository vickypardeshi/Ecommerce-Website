import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import createCategoryList from '../components/common/CreateCategoryList';
import CustomModal from '../components/common/CustomModal';
import ErrorHandler from '../components/common/ErrorHandler';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { createPage, getInitialData } from '../store/actions/action';

const Page = () => {

    const [showCreatePage, setShowCreatePage] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);
    const { loading, error } = page;

    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(createCategoryList(category.categories));
    }, [category]);

    const onCategoryChange = (e) => {
        const category = categories.find(
            category => category.value === e.target.value
        );
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleClose = () => {
        setTitle('');
        setDesc('');
        setCategoryId('');
        setType('');
        setBanners([]);
        setProducts([]);

        setShowCreatePage(false);
    }

    const handleShow = () => {
        setShowCreatePage(true);
    }

    const handleSubmit = () => {
        if (title === "") {
            //alert('Title is required');
            setShowCreatePage(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);

        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form));

        setTitle('');
        setDesc('');
        setCategoryId('');
        setType('');
        setBanners([]);
        setProducts([]);

        setShowCreatePage(false);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const retryLogic = () => {
        dispatch(getInitialData());
    }

    const createPageBody = (
        <>
            <Container>
                <Row>
                    <Col>
                        <FormInput
                            inputType="select"
                            placeholder={'Select Category'}
                            value={categoryId}
                            onChange={onCategoryChange}
                            options={categories}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            placeholder={'Page Title'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            placeholder={'Page Description'}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Col>
                </Row>
                {
                    banners.length > 0 ?
                        banners.map((banner, index) =>
                            <Row key={index}>
                                <Col>
                                    {banner.name}
                                </Col>
                            </Row>
                        ) : null
                }
                <Row>
                    <Col>
                        <FormInput
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}
                        />
                    </Col>
                </Row>
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <Row key={index}>
                                <Col>
                                    {product.name}
                                </Col>
                            </Row>
                        ) : null
                }
                <Row>
                    <Col>
                        <FormInput
                            type="file"
                            name="products"
                            onChange={handleProductImages}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );

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

    if (error) {
        return (
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
            <Button 
                onClick={handleShow}
                className="mx-2 my-2 fs-1"
            >
                Create Page
            </Button>
            <CustomModal
                title={'Create New Page'}
                show={showCreatePage}
                body={createPageBody}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                button={'Create'}
            />
        </Layout>
    );
}

export default Page;
