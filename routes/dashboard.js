/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : Creating a dashboard for SES  

*/
const express = require('express');
const router = express.Router();

const userFunctions = require('../shared/functions');

router.route('/')
	.get( (req,res,next) => {

		async.waterfall(
		[
			function(nextFun){
				userFunctions.identityEmailList(function(err,emailList){
					nextFun(err,emailList);
				});
			},
			function(emailList,nextFun){
				userFunctions.identityDomainList(function(err,domainList){
					emailList.domainList = domainList
					nextFun(err,emailList);
				});
			},
			function(emailList,nextFun){
				userFunctions.fetchSendQuota(function(err,sendQuota){
					emailList.sendQuota = sendQuota
					nextFun(err,emailList);
				});
			},
			function(emailList,nextFun){
				userFunctions.fetchSendStatistics(function(err,sendStatistics){
					console.log("sendStatistics:"+JSON.stringify(sendStatistics));
					emailList.sendStatistics = sendStatistics
					nextFun(err,emailList);
				});
			}

		],function(err,emailList){

			if(err){
				
				req.flash("error","Seems like something went wrong.Please try after sometime");
				res.redirect('/');
			}	
			else{
				
				res.render('dashboard', { title: 'SES - Verify Email' , pageHeading : 'Dashboard',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), result : emailList });
			}

		});
		
	});	

module.exports = router;