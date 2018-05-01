/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : Landing page of the application

*/

const express = require('express');
const router = express.Router();

router.route('/')
	.get( (req,res,next) => {
		res.render('index', { title: 'SES - Index' , pageHeading : 'Welcome',success: req.flash('success','') ,error: req.flash('error','') });
	});

module.exports = router;
