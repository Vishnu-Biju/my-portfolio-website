
const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");




const app = express();
app.use(cors());
app.use(express.json());
app.use("/Contact", router);
app.listen(3000, () => console.log("Server Running"));
// send mail
router.post("/Contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  

    try {

        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            service: "gmail",
            port: 3000,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            } 
        });

        const mailOptions = {
          from: email ,
          to:process.env.EMAIL,
          subject: "Contact Form Submission - Portfolio",
          html: `<p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Phone: ${phone}</p>
                 <p>Message: ${message}</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


