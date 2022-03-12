import nodemailer from "nodemailer"


function gmailTransport(){
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "me.hide009@gmail.com", //process.env.ADMIN_EMAIL,
      pass: "EducationRY5" // process.env.ADMIN_PASSWORD
    }
  })
}

function sendMail(mailOptions){

  // let {to, from, subject, html} = mailOptions
  
  return new Promise((s, e)=>{
    gmailTransport().sendMail(mailOptions, function(error, info){
        if (error) {
          e(error)
        } else {
          s(info)
        }
      });
    })
  
}


export default sendMail