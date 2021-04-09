import React, { useState } from 'react';
import {
    Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import FormInput from '../components/common/FormInput';
import Layout from '../components/Layout';
import { addCategory, deleteCategories, getAllCategory, updateCategories, } from '../store/actions/action';
import CustomModal from '../components/common/CustomModal';
import {
    IoIosCheckboxOutline, IoIosCheckbox,
    IoIosArrowForward, IoIosArrowDown,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import '../styles/category.css'

const Category = () => {

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [showUpdatedCategory, setShowUpdatedCategory] = useState(false);

    const [showDeleteCategory, setShowDeleteCategory] = useState(false);

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

    const handleDeleteCategory = () => {
        const checkedIdsArray = checkedArray.map(item => ({
            _id: item.value
        }));
        const expandedIdsArray = expandedArray.map(item => ({
            _id: item.value
        }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        dispatch(deleteCategories(idsArray))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory());
                }
            })

        setExpandedArray([]);
        setCheckedArray([]);

        setShowDeleteCategory(false);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) =>
                categoryId === category.value

            );
            category && checkedArray.push(category);
        });
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) =>
                categoryId === category.value

            );
            category && expandedArray.push(category);
        });

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, checkedArray, expandedArray });
    }

    const handleUpdatedCategoryShow = () => {
        updateCheckedAndExpandedCategories();
        setShowUpdatedCategory(true);
    }

    const handleUpdatedCategoryClose = () => {
        setShowUpdatedCategory(false);
    }

    const handleUpdatedCategory = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "");
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "");
        });

        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory());
                }
            })

        setExpandedArray([]);
        setCheckedArray([]);

        setShowUpdatedCategory(false);
    }

    const handleCategoryChange = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item
            );
            setCheckedArray(updatedCheckedArray);
        }
        else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item
            );
            setExpandedArray(updatedExpandedArray);
        }
    }

    const handleDeleteCategoryClose = () => {
        setShowDeleteCategory(false);
    }
    const handleDeleteCategoryShow = () => {
        updateCheckedAndExpandedCategories();
        setShowDeleteCategory(true);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 &&
                        renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const addCategoryBody = (
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

    const updateCategoryBody = (
        <>
            <Row>
                <Col>
                    <h6>Expanded Categories</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <FormInput
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryChange(
                                    'name', e.target.value, index, 'expanded'
                                )}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryChange(
                                    'parentId', e.target.value, index, 'expanded'
                                )}
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
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <FormInput
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryChange(
                                    'name', e.target.value, index, 'checked'
                                )}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryChange(
                                    'parentId', e.target.value, index, 'checked'
                                )}
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
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            {/* <input
                type="file"
                name="categoryImage"
                onChange={handleCategoryImage}
            /> */}
        </>
    );

    const deleteCategoryBody = (
        <>
            Are you sure want to delete
            <h5>Expanded</h5>
            {
                expandedArray.map((item, index) =>
                    <span key={index}>{item.name}</span>
                )
            }
            <h5>Checked</h5>
            {
                checkedArray.map((item, index) =>
                    <span key={index}>{item.name}</span>
                )
            }
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
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={handleDeleteCategoryShow}>Delete</button>
                        <button onClick={handleUpdatedCategoryShow}>Edit</button>
                    </Col>
                </Row>
            </Container>

            <CustomModal
                title={'Add New Category'}
                show={show}
                body={addCategoryBody}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                buttonName={'Save'}
            />
            {/* Update Category */}
            <CustomModal
                title={'Update Category'}
                show={showUpdatedCategory}
                body={updateCategoryBody}
                size="lg"
                handleClose={handleUpdatedCategoryClose}
                handleSubmit={handleUpdatedCategory}
                buttonName={'Update'}
            />
            {/* Delete Category */}
            <CustomModal
                title={'Delete Category'}
                show={showDeleteCategory}
                body={deleteCategoryBody}
                handleClose={handleDeleteCategoryClose}
                handleSubmit={handleDeleteCategory}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => handleDeleteCategoryClose()
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => handleDeleteCategory()
                    }
                ]}
            />
        </Layout>
    );
}

export default Category;