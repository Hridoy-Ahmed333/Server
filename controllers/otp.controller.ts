import {Request, Response} from "express";
import axios from "axios";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);

let otp = 0
const sendOTP = (req: Request, res: Response) => {
    const {nationalId} = req.body
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    otp = verificationCode
    console.log("OTP: " + verificationCode)
    const master_api = process.env.MASTER_SERVER_URL
    axios.get(master_api + "Users/nationalId/" + nationalId).then(r => {
        console.log(r.data)
        client.messages
            .create({
                from: process.env.TWILIO_NUMBER,
                body: "Your Verification code for LandChain Registration is " + verificationCode +
                    "\n - LandChain",
                to: r.data.phone
            })
            .then(() => {
                res.send({status: 'success', msg: 'OTP send to registered mobile number', otp: verificationCode})
                return
            })
    }).catch(err => {
        console.log(err.message)
        res.send({status: 'failed', msg: "National Id doesn't exist"})
    })
}

export {sendOTP}
