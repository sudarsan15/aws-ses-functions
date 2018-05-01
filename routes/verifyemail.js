/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : verify email using SES 

*/

const express = require('express');
const router = express.Router();
const userFunctions = require('../shared/functions');


router.route('/')
	.get( (req,res,next) => {
		res.render('verifyemail', { title: 'SES - Verify Email' , pageHeading : 'Verify Email',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), });
		
	})
	.post((req,res,next) => {

		let email =  userFunctions.validateInput(req.body.email);
		if(email != null && email != "" && email != undefined){
			if(validator.isEmail(email)){
				userFunctions.verifyEmail(email,function(err,data){
					if (err){
						console.log("err"+err);
						req.flash('error',"Email verification failed. Please try after some time");
						res.redirect('/verifyemail');
					}
					else{
						req.flash('success',"Email verification successfully initiated");
						res.redirect('/verifyemail');
					}
				});
			}
			else{
				req.flash('error',"Invalid email Id");
				res.redirect('/verifyemail');
			}
		}
		else{

			req.flash('error',"Email field cannot be null");
			res.redirect('/verifyemail');
		}
	});

module.exports = router;
