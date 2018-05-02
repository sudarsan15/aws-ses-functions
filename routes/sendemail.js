/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : SES send email functionality

*/

const express = require('express');
const router = express.Router();

const userFunctions = require('../shared/functions');

router.route('/')
	.get( (req,res,next) => {
		userFunctions.identityEmailList((err,emailList)=>{
			if(err){
				res.render('sendemail', { title: 'SES - Send Email' , pageHeading : 'Send Email',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), emailList : null });
			}	
			else{

				res.render('sendemail', { title: 'SES - Send Email' , pageHeading : 'Send Email',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), emailList : emailList });
			}
		});
	})
	.post((req,res,next)=>{
		let  toAddress  = userFunctions.validateInput(req.body.toaddress);
		let  fromAddress = userFunctions.validateInput(req.body.fromaddress);
		let  subject  = userFunctions.validateInput(req.body.subject);
		let  message  = userFunctions.validateInput(req.body.message);

		if((toAddress != null) && (toAddress != "")  && (fromAddress != null) && (fromAddress != "") &&  (message != null) && (message != "")){

			if(validator.isEmail(toAddress) && validator.isEmail(fromAddress)){

				transporter.sendMail({
				    from: fromAddress,
				    to: toAddress,
				    subject: subject,
				    text: message,
				   
				}, (err, info) => {
				   
				    if(err){
				    	req.flash('error',err.message);
				    	res.redirect('/sendemail');	
				    }
				    else{
				    	req.flash('success','Email sent successfully');
				    	res.redirect('/sendemail');	

				    }
				});

			}
			else{
				req.flash('error',"Please enter valid email ids");
				res.redirect('/sendemail');
			}

		}
		else{
			req.flash('error',"fromAddress,toAddress and message is mandatory");
			res.redirect('/sendemail');
		}

	});


module.exports = router;	