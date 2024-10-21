// import nodemailer from 'nodemailer';


// export default async function sendVerificationEmail(username, email,token) {
//   try {
    
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'shreyanshgangwar1@gmail.com',    
//         pass: 'shrey1509'     
//       }
//     });
    
//     // Email options
//     const mailOptions = {
//       from: 'shreyanshgangwar1@gmail.com',             
//       to: email,                                 
//       subject: `Welcome to CULRAV-AVISHKAR, ${username}!`,
//       text: `Hi ${username},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nYour Team`, // Plain text body
//         html: `<h1>Hi ${username}!</h1><p>Welcome to our Culrav-Avishkar! We're excited to have you Registered.</p>
//         <br>
//         <h1>Verification code</h1>
//         ${token}
//         <br>
//         <p>Best regards,<br>Your Team</p>` // HTML body (optional)
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent: ' + info.response);
//       return token;
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// }

// // Example usage
