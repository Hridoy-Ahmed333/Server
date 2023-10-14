import app from 'express'
import {createUser, getAllUsers, getUserById} from '../controllers/user.controller'
import {uploadFile} from "../middleware/upload.image";

const router = app.Router()

router.get('/', getAllUsers)
router.post('/', uploadFile.array('nationalIdCard', 2), createUser)
router.get('/:id', getUserById)
module.exports = router
