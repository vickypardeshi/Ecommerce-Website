import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (parentId, categories, newCategory) => {
    let myCategories = [];

    if(parentId === undefined){
        return [
            ...categories,
            {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                children: [],

            }
        ];
    }

    for(let category of categories){
        if(category._id === parentId){
            myCategories.push({
                ...category,
                children: category.children ?
                    buildNewCategories(parentId, [...category.children, {
                        _id: newCategory._id,
                        name: newCategory.name,
                        slug: newCategory.slug,
                        parentId: newCategory.parentId,
                        children: newCategory.children,
                    }], newCategory)
                    : [],
            });
        }
        else{
            myCategories.push({
                ...category,
                children: category.children ?
                    buildNewCategories(parentId, category.children, newCategory)
                    : [],
            });
        }
        
    }

    return myCategories;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            
            state = {
                ...state,
                loading: false,
                categories: updatedCategories,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                loading: false,
            }
            break;
        default:
            return state;
    }

    return state;
}