'use strict';
var authHandler = require('./authenticator');
var AuthenticatorObj = authHandler.Auth;
var registerHandler = require('./registerHandler');
var RegisterObj = registerHandler.Register;
var forgotPasswordHandler = require('./forgotPasswordHandler');
var ForgotPasswordObj = forgotPasswordHandler.ForgotPassword;

/* User Login Method */
module.exports.authenticate = function(modelName, options, callback) {
  var authenticator = new AuthenticatorObj(modelName, options);

  authenticator.authenticate(function(err, result){
    if(err)
      return callback(err);
    else
      return callback(null, result);
  });
};

/* User Register Method*/

module.exports.register = function(modelName, options, callback) {
  var register = new RegisterObj(modelName, options);

  register.register(function(err, result){
    if(err)
      return callback(err);
    else
      return callback(null, result);
  });
};

/* User Forgot Password Method */

module.exports.forgotPassword = function(modelName, options, callback) {
	var forgotPassword = new ForgotPasswordObj(modelName, options);

	forgotPassword.forgotPassword(function(err, result){
	    if(err)
	      return callback(err);
	    else
	      return callback(null, result);
  	});
};
