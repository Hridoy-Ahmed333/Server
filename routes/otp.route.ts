import app from "express";
import {sendOTP} from "../controllers/otp.controller";

const router = app.Router()
router.post('/send', sendOTP)
module.exports = router
