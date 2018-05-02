/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : Verify a domain with SES

*/

const express = require('express');
const router = express.Router();
const userFunctions = require('../shared/functions');


router.route('/')
	.get( (req,res,next) => {
		res.render('verifydomain', { title: 'SES - Verify Domain' , pageHeading : 'Verify Domain',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), });
		
	})
	.post((req,res,next) => {

		let domain =  userFunctions.validateInput(req.body.domain);
		
		if(domain != null && domain != "" && domain != undefined){
			if(validator.isFQDN(domain)){

				userFunctions.verifyDomain(domain,(err,data)=>{
					if (err){
						console.log("err"+err);
						req.flash('error',"Domain verification failed. Please try after some time");
						res.redirect('/verifydomain');
					}
					else{
						console.log("data:"+JSON.stringify(data));
						req.flash('success',"Domain verification successfully initiated.Please add following details in DNS "+finalResult);
						res.redirect('/verifydomain');
					}
				});
			}
			else{
				req.flash('error',"Invalid Domain");
				res.redirect('/verifydomain');
			}
		}
		else{

			req.flash('error',"Domain field cannot be null");
			res.redirect('/verifydomain');
		}
	});

module.exports = router;
