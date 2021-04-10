const Category = require('../../models/category');
const Product = require('../../models/product');

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
            type: cat.type,
            parentId: cat.parentId,
            children: getCategoriesList(categories, cat._id), //call for getting child category
        });
    }

    return categoryList;
}

exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select('_id name price quantity slug description productPictures category')
        .populate({
            path: 'category',
            select: '_id name'
        }) //belong to diff collection & it will fill the relavent data
        .exec();  //channing used
        
    res.status(200).json({
        categories: getCategoriesList(categories),
        products
    });
}