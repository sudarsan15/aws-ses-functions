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
			(nextFun)=>{
				userFunctions.identityEmailList((err,emailList)=>{
					nextFun(err,emailList);
				});
			},
			(emailList,nextFun)=>{
				userFunctions.identityDomainList((err,domainList)=>{
					emailList.domainList = domainList
					nextFun(err,emailList);
				});
			},
			(emailList,nextFun)=>{
				userFunctions.fetchSendQuota((err,sendQuota)=>{
					emailList.sendQuota = sendQuota
					nextFun(err,emailList);
				});
			},
			(emailList,nextFun)=>{
				userFunctions.fetchSendStatistics((err,sendStatistics) => {
					console.log("sendStatistics:"+JSON.stringify(sendStatistics));
					emailList.sendStatistics = sendStatistics
					nextFun(err,emailList);
				});
			}

		],(err,emailList)=>{

			if(err){
				
				req.flash("error","Seems like something went wrong.Please try after sometime");
				res.redirect('/');
			}	
			else{
				
				res.render('dashboard', { title: 'SES - Dashboard' , pageHeading : 'Dashboard',success: req.flash('success','') ,error: req.flash('error',''), csrfToken: req.csrfToken(), result : emailList });
			}

		});
		
	});	

module.exports = router;