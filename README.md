# trt-authentication
We internally use this npm for token based authentication


An authenticate module for developers to easily integrate Register, Login, Forgot password and Reset password functionalities.


Pre-requisite
-------------------------------------
MongoDB connection in your project
An User model schema

Installation
-------------------------------------
npm install trt-authenticate


How to use in your project
-------------------------------------

1) Require the dependency on the top of the file
	
	var trtAuth = require('trt-authenticate');

2) Methods : 
	a) register (Basic registration for a user into your system)
		Parameters : Model name, user object 
		Example : 

		var trtAuth = require('trt-authenticate');
		var User = require('./models/user');
		var userObj = {
						name : 'ABC', 
						email: 'test@gmail.com', 
						password : '123', 
						role : 1
					}
		trtAuth.register(User, userObj,function (err, result) {
			if(err)
				throw err;
			else
				console.log(result);
		});

		This will take User model as first argument and user object to register as second parameter. This method will return created user's information.

	b) authenticate (Authenticate user)
		Parameters : Model name, user object 
		Example : 

		var trtAuth = require('trt-authenticate');
		var User = require('./models/user');
		var userObj = {
						email: 'test@gmail.com', 
						password : '123'
					}
		trtAuth.authenticate(User, userObj,function (err, result) {
			if(err)
				throw err;
			else
				console.log(result);
		});

		This will take User model as first argument and user object to register as second parameter. This method will return error for invalid login or user's information on successful login.

	c) forgotPassword (forget password)
		Parameters : Model name, mail config object 
		Example : 

		var trtAuth = require('trt-authenticate');
		var User = require('./models/user');
		var obj = {
				mailConfig : {
					service : 'Gmail', 
					userMail : 'user@gmail.com', 
					userPassword : 'xxxxx', 
					fromName : 'user', 
					fromMail : 'user@gmail.com', 
					subject : 'Forgot password', 
					data : '<html><body>this is forgot password link : [redirectLink]</body></html>'	
				},
				toUserEmail : 'user@gmail.com', 
				redirectLink : 'redirectLink'
					}
		trtAuth.forgotPassword(User, obj,function (err, result) {
			if(err)
				throw err;
			else
				console.log(result);
		});

		This method sends reset password link for on user's mail address. For mailing it is using Nodemailer module of npm. mailConfig object contains the information regarding the sender's mail configuration and toUserEmail is the recievers mail address. Redirect url is the url you want user to redirect.