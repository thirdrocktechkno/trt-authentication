"use strict";
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var transporter;

// Expose to the world
module.exports.ForgotPassword = ForgotPassword;

/**
 * <p>Generates a registration object that can be used to deliver user registration process.</p>
 *
 */

function ForgotPassword(model, options) {
  this.modelName = model;
  this.fieldsObj = options;
};

ForgotPassword.prototype.forgotPassword = function (callback) {
  var inst = this;
  if (!inst.modelName || !inst.fieldsObj)
    callback(new Error('Invalid config method defined'));

  transporter = nodemailer.createTransport("SMTP",
  {
      service: inst.fieldsObj.mailConfig.service,
      auth: {
          user: inst.fieldsObj.mailConfig.userMail,
          pass: inst.fieldsObj.mailConfig.userPassword
      },
      logger: false
  }, {
      from: '' + inst.fieldsObj.mailConfig.fromName + '<'+inst.fieldsObj.mailConfig.fromMail+'>'
  });

  inst.modelName.findOne({ email: inst.fieldsObj.toUserEmail }, function (err, result) {
    if(err)
      callback(err)
    if(result) {
      var message = {
          // from is required
          from: inst.fieldsObj.mailConfig.fromMail,
          to: inst.fieldsObj.toUserEmail,
          subject: inst.fieldsObj.mailConfig.subject,
          html: inst.fieldsObj.mailConfig.data.replace("[linkPath]", inst.fieldsObj.redirectLink + 'token?=' + result._id)
      };
      transporter.sendMail(message, function (err, info) {
        if(err)
          callback(err);
        else
          callback(null, {message : 'Reset password link is successfully sent to your email address'});
      });
    } else {
      callback(new Error('Invalid email address'));
    }
  });
};

