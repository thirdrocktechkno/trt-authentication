"use strict";
var bcrypt = require('bcryptjs');

// Expose to the world
module.exports.Auth = Auth;

/**
 * <p>Generates a Auth object that can be used to deliver authentication.</p>
 *
 */

function Auth(model, options) {
  this.modelName = model;
  this.email = options.email;
  this.password = options.password;
};

Auth.prototype.authenticate = function (callback) {
  var inst = this;
  if (!inst.modelName || !inst.email || !inst.password)
    callback(new Error('Invalid config method defined'));

  inst.modelName.findOne({ email: inst.email }, function (err, result) {
    if (err)
      callback(new Error('Invalid email address'));
    else {
      bcrypt.compare(inst.password, result.password, function (err, isMatch) {
        if (err)
          callback(err);
        if(isMatch)
          callback(null, result);
        else
          callback(new Error('Invalid password'));
      });
    }
  });
};

