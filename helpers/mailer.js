

const nodemailer = require('nodemailer');
const fs = require('fs');


/** smtp configuration for nodemailer */
var transporter = nodemailer.createTransport({
	 host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "Email",
      clientId:"",
      clientSecret: "",
      refreshToken: "",
      accessToken:""
    }
});

module.exports = {

    readHTMLTemplate: function (templatePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(templatePath, {encoding: 'utf-8'}, function (err, html) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(html);
                }
            });
        });
    },

    sendMail: async function (mailOptions) {
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log(info);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
};
