var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/products-helpers');
const userHelpers = require('../helpers/user-helpers');

/* GET users listing. */





router.get('/', function (req, res, next) {

  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render('admin/view-products', { admin: true, products })
  })

});

router.get('/add-products', function (req, res) {
  res.render('admin/add-products')
})


router.post('/add-products', (req, res) => {

  console.log(req.body);
  console.log(req.files.Image);


  productHelpers.addproduct(req.body, (id) => {
    let image = req.files.Image
    image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render('admin/add-products')
      } else {
        console.log(err);
      }
    })

  })

})



router.get('/view-users', function (req, res, next) {

 userHelpers.getusers().then((users) => {
    console.log(users);
    res.render('admin/view-users', { admin: true, users })
  })


});

router.get('/Delete-users/:id',(req,res)=>{
console.log(req.params.id);
userHelpers.deleteuser(req.params.id).then(()=>{
res.redirect('/admin/view-users')
})

})

module.exports = router;
