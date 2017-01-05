var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next) {
  res.render('register',{
   title:'Register'
  })
});

router.get('/login',function(req,res,next) {
  res.render('login',{
    title:'Login'
  })
});


router.post('/register',function(req,res,next) {
  var realName = req.body.realName;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.files) {
    console.log('Uploading file');

    var profileImageOriginalName = req.body.profileimage.originalname;
    var profileImageName = req.body.profileimage.name;
    var profileImageMime = req.body.profileimage.mimeType;
    var profileImagePath = req.body.profileimage.path;
    var profileImageExt = req.body.profileimage.extension;
    var profileImageSize = req.body.profileimage.size;

  } else {
    var profileImageName = 'no_image.jpg';
  }


  req.check('realName','Name field is required').notEmpty();
  req.check('email','Email field is required').notEmpty();
  req.check('email','invalid email').isEmail();
  req.check('username','Username field is required').notEmpty();
  req.check('password','Password field is required').notEmpty();
  req.check('password2','Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    res.render('register',{
      errors:errors,
      realName:realName,
      email:email,
      username: username,
      password: password,
      password2: password2

    });
  } else {
    var newUser = new User({
      realName:realName,
      email:email,
      username: username,
      password: password,
      profileimage: profileImageName
    })
  }

  //Create User

  User.createUser(newUser,function(err,user) {
    if(err) throw err;
    console.log(user)
  });

  //Success flash msg

  req.flash('success','you are now registered and may log in');

  res.location('/');
  res.redirect('/');

});

module.exports = router;
