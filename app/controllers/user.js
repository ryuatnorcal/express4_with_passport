var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy;
    
module.exports = function (app) {
  //app.use('/', router);
app.use(passport.initialize());
  app.get('/',
    function(req, res) {
      res.render('index', { user: req.user , title: "title"});
    });

  app.get('/login',
    function(req, res){
      res.render('user/login');
    });
    
  app.post('/login', 
    passport.authenticate('local', 
    	{ 
    		successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: false 
      }),
    function(req, res) {
      res.redirect('/');
    });
    
  app.get('/signup',
  	function(req,res){
  		res.render('user/register');
  	});

  app.post('/signup',
  	function(req, res, next){
  		console.log(req.body.username + req.body.password);
  		var user = User.findOne({username: req.body.username });
  		console.log("after user " + user);
  		if(user){
  			console.log("inside if ");
  			user = new User();
  			console.log("after user ");
  			user.username = req.body.username;
  			user.password = bcrypt.hash(req.body.password, 8, function(err, hash) {
  				if(err){
  					return res.render("user/login", {info: "Sorry. That username already exists. Try again."});
  				}
  				else{
  					console.log("after bcrypt");

  					user.save(function(err){
  						if(err){
  							console.log("error here ");
  							return res.send(err);
  						}
  						else{
  							console.log("before authenticate ");
  							passport.authenticate('local', function(err, usr, info) {
  							    if (err) { return next(err); }
  							    console.log(usr);
  							    if (!usr) { 
  							    	console.log(usr);
  							    	return res.redirect('/login'); 
  							    }
  							    return res.redirect('/');
  							    // req.logIn(user, function(err) {
  							    //   if (err) { return next(err); }
  							    //   	return  res.redirect('/users/' + req.user.username);
  							    // });
  							  })(req, res, next);
  							console.log("after auth");
  							
  						}
  					});		
  				}
  			});
  			
  		}
  	});

  app.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/');
    });

  

  // app.get('/profile',
  //   require('connect-ensure-login').ensureLoggedIn(),
  //   function(req, res){
  //     res.render('profile', { user: req.user });
  //   });

};

