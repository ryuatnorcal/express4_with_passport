// Example model

var mongoose = require('mongoose'),
		bcrypt = require('bcryptjs'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String  
});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

UserSchema.methods.validPassword = function( password ) {    
    return ( this.password === bcrypt.hash(password, 8, function(err, hash) {
    	if(err){
    		return res.render("user/login", {info: "Sorry. That username already exists. Try again."});
    	}
    }));
};

module.exports = mongoose.model('User', UserSchema);

