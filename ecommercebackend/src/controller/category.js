const Category = require('../models/category');
const slugify = require('slugify');

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
            children: getCategoriesList(categories, cat._id), //call for getting child category
        });
    }

    return categoryList;
}

exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),  
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