const { getAllProducts } = require('../../../dibi/Week 5 Task/helpers/product-helpers');
const db = require('../config/connection')
var collection = require('../config/collections');
const { PRODUCT_COLLECTION } = require('../config/collections');


module.exports = {


    addproduct: (products, callback) => {
        console.log(products);

        db.get().collection('product').insertOne(products).then((data) => {

            console.log(data);
            callback(data.insertedId)
        })
    },


    getAllProducts: () => {

        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })

    }


}