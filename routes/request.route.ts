import app from 'express'
import {deleteRequest, getAllRequests, getUserPendingRequests, updateRequest} from "../controllers/request.controller";


const router = app.Router()

router.get('/', getAllRequests)
// router.post('/', addNewRequest)
router.put('/', updateRequest)
router.get('/pending/:id', getUserPendingRequests)
router.delete('/:id', deleteRequest)
module.exports = router
