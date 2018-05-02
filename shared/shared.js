/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com
	Description : Global declarations

*/

//App JS 

global.path = require('path');
global.favicon = require('serve-favicon');
global.logger = require('morgan');
global.cookieParser = require('cookie-parser');
global.bodyParser = require('body-parser');


// Others

global.AWS  = require('aws-sdk');
global.xss  = require('xss');
global.striptags = require('striptags');
global.validator = require('validator');
global.session = require('express-session');
global.csrf = require('csurf');
global.flash = require('connect-flash');
global.helmet = require('helmet');
global.async = require('async');
global.nodemailer = require('nodemailer');



global.config = require('../config/config');

global.transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: process.env.SES_API_VERSION
    })
});
