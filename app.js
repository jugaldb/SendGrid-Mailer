const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const chalk = require('chalk')
const sgMail = require('@sendgrid/mail');

//Start App
const app = express();

//SendGrid settings
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mailingList = ['jugalbhatt3@gmail.com']

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Send emails via mailing list above
app.get('/sendMails',async(req,res,next)=>{
  for(let mail of mailingList){
    const msg = {
    to: mail,
    from: process.env.FROM_MAIL,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then((result)=>{
      console.log(chalk.green("Sent to "),mail)
    }).catch((err)=>{
      console.log(chalk.red("Couldn't send to "),mail,chalk.red(' and Error: '), err.toString())
    })
  }
})

//route not found
app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
