/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : AWS SES configuration

*/


let AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
    region : process.env.SES_REGION
});


global.ses = new AWS.SES();



 