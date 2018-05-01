/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : Creating custom functions which can be used everywhere

*/

const express = require('express');
const router = express.Router();


require('../shared/shared');


// This is the function using for validation and sanitisation of user input

exports.validateInput = (userInput) =>{
	if(userInput != ""){
		let santizedData =  validator.trim(xss(striptags(userInput)));
		return santizedData;
	}
	else{
		return null;
	}

}

// This function will help you start email verification processs

exports.verifyEmail = (email,callBack) =>{
	let params = {
	  EmailAddress: email,
	};
	ses.verifyEmailIdentity(params, function(err, data) {
		callBack(err,data);
	});	
}

//Domain verificatoin

exports.verifyDomain = (domainName,callBack) =>{
	let params = {
  		Domain: domainName
 	};
	ses.verifyDomainIdentity(params, function(err, data) {
	  callBack(err,data);
	});
}

// List all emails irrespective of wether its verified or not

exports.identityEmailList = (callBack) =>{
	let params = {
		  IdentityType: "EmailAddress", 
		};
 	ses.listIdentities(params, function(err, data) {
   		callBack(err,data);
 	});
}


//  List all domains irrespective of wether its verified or not

exports.identityDomainList = (callBack) =>{
	let params = {
		  IdentityType: "Domain", 
		};
 	ses.listIdentities(params, function(err, data) {
   		callBack(err,data);
 	});
}

// fetching the send quota

exports.fetchSendQuota = (callBack) =>{
	let params = {};
 	ses.getSendQuota(params, function(err, data) {
   		callBack(err,data);
 	});
}

//fetching send satistics

exports.fetchSendStatistics = (callBack) =>{
	let params = {};
 	ses.getSendStatistics(params, function(err, data) {
   		callBack(err,data);
 	});
}


