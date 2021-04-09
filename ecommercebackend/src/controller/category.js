const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid');

//get parent and child categories
function getCategoriesList(categories, parentId=null){
    const categoryList = [];
    let category;

    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: getCategoriesList(categories, cat._id), //call for getting child category
        });
    }

    return categoryList;
}

exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,  
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    //if child category
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const category = new Category(categoryObj);
    category.save((error, cat) =>{
        if(error){
            return res.status(400).json({
                error,
            });
        }
        if(cat){
            return res.status(201).json({
                cat,
            });
        }
    });
}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error){
            return res.status(400).json({
                error, 
            });
        }
        if(categories){
            const categoryList = getCategoriesList(categories); //get parent and child categories
            return res.status(200).json({
                categoryList,
            })
        }
    })
}

exports.updateCategories = async (req, res) => {

    const { _id, name, parentId, type } = req.body;
    const updateCategories = [];
    if(name instanceof Array){
        for(let i=0; i < name.length; i++){
            const category = {
                name: name[i],
                type: type[i],
            };
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updateCategory = await Category.findOneAndUpdate(
                {_id: _id[i]}, category, {new: true}
            );
            updateCategories.push(updateCategory);
        }
        return res.status(201).json({updateCategories});
    }
    else{
        const category = {
            name,
            type
        };
        if(parentId !== ""){
            category.parentId = parentId;
        }
        const updateCategory = await Category.findOneAndUpdate(
            {_id}, category, {new: true}
        );
        return res.status(200).json({updateCategory});
    }
    
}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for(let i = 0; i < ids.length; i++){
        const deleteCategory = await Category.findOneAndDelete({
            _id: ids[i]._id
        });
        deletedCategories.push(deleteCategory);
    }

    if(deletedCategories.length === ids.length){
        res.status(201).json({
            message: 'Categories Deleted'
        });
    }
    else{
        res.status(400).json({
            message: 'Something went wrong'
        });
    }
}