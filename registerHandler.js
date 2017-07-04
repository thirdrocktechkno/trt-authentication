"use strict";
var bcrypt = require('bcryptjs');

// Expose to the world
module.exports.Register = Register;

/**
 * <p>Generates a registration object that can be used to deliver user registration process.</p>
 *
 */

function Register(model, options) {
  this.modelName = model;
  this.fieldsObject = options;
};

Register.prototype.register = function (callback) {
  var inst = this;
  if (!inst.modelName || !inst.fieldsObject)
    callback(new Error('Invalid config method defined'));

  var salt = bcrypt.genSaltSync(10);
  inst.fieldsObject.password = bcrypt.hashSync(inst.fieldsObject.password, salt);

  var register = new inst.modelName(inst.fieldsObject);
  register.save(function(err, result){
    if(err)
      callback(err);
    else
      callback(null, result);
  });
};

