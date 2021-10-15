 const sendmail= (useremail , udata='')=>{
    const nodemailer = require('nodemailer');
   require('dotenv').config()
       let transporter = nodemailer.createTransport({
           host: 'smtp.gmail.com',
           port: 465,
           secure: true,   
           service: 'gmail',
               auth: {
                   user: process.env.EMAIL,
                   pass: process.env.PASSWORD
               }
       })
       
       message = {
           from:  process.env.EMAIL,
           to: 'info@flyweis.technology',
           subject: "support form details ",
           text: `Name : ${udata.yourname} ,  Email:  ${udata.email}  Phone No : ${udata.phone}  
            , Subject :  ${udata.sub || udata.services}   ,
            Message : ${udata.msg}  
            `
       }  
       
       transporter.sendMail(message, function(err, info) {
           if (err) {
             console.log( "erro=> " + err)
           } else {
             console.log(info );
           }
   
      })
   }
   
   module.exports=sendmail