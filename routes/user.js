var express = require('express');
const { response } = require('../app');
// const { response } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/products-helpers')
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render('user/view-products', { admin: false, products })
  })

});



router.get('/login', (req, res) => {
  res.render('user/login')
})


router.get('/signup', (req, res) => {
  res.render('user/signup')
})


router.post('/signup', (req, res) => {

  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
  })
})


router.post('/login', (req, res) => {
   console.log(req.body);
  userHelpers.dologin(req.body).then((response) => {
    if (response.status) {
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })

})

module.exports = router;
