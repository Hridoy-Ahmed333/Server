import app from "express";
import {getAllMasterData} from "../controllers/master-data.controller";


const router = app.Router()

router.get('/', getAllMasterData)

module.exports = router
