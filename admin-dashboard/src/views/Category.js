import React, { useState } from 'react';
import {
    Col, Container, Row, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { addCategory, } from '../store/actions/action';
import CustomModal from '../components/common/CustomModal';
import '../styles/category.css'

const Category = () => {

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleSubmit = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        
        setShow(false);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0
                        ? (
                            <ul>
                                {renderCategories(category.children)}
                            </ul>
                        )
                        : null
                    }
                </li>
            );
        }

        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({
                value: category._id,
                name: category.name
            });
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const body = (
        <>
            <FormInput
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select 
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
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
                <input
                    type="file" 
                    name="categoryImage"
                    onChange={handleCategoryImage}
                />
        </>
    );

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="category">
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <CustomModal
                title={'Add New Category'}
                show={show}
                body={body}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Layout>
    );
}

export default Category;