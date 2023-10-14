import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import * as path from 'path';
import {Land} from "./models/land.model";
import {RequestModel} from "./models/request.model";
import {User} from "./models/user.model";

dotenv.config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express();


const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/landImage', express.static(path.join(__dirname, '/public/uploads/')));

mongoose.connect(process.env.MONGO_DB_URL as string)
    .then(r => {
        console.log('Connected with local MongoDB 👍')
        // initMasterData()
    })
    .catch((err) => console.log(err))

app.use('/api/user/', require('./routes/user.route'))
app.use('/api/land/', require('./routes/land.route'))
app.use('/api/request/', require('./routes/request.route'))
app.use('/api/otp/', require('./routes/otp.route'))
// app.use('/api/master-data/', require('./routes/master-data.route'))


app.get('/api/clear', async (req, res) => {
    await Land.deleteMany({})
    await RequestModel.deleteMany({})
    await User.deleteMany({})

    res.send({status: "success", data: "Cleared all values in dB"})
})

app.listen(process.env.PORT, () => {
    console.log(`⚡ Land Registration App REST API Server Started at ${process.env.PORT}`)
})
