import app from 'express'
import {
    addLand,
    confirmAddLand,
    confirmBuyLand,
    getAllLands,
    getLandById,
    getLandsBySearch,
    requestBuyLand,
    updateLand
} from '../controllers/land.controller'
import {uploadFile} from '../middleware/upload.image'


const router = app.Router()

router.get('/', getAllLands)
router.get('/:id', getLandById)
router.post('/', uploadFile.array('images', 10), addLand)
router.post('/update', uploadFile.array('images', 10), updateLand)
router.put('/confirm/:rId', confirmAddLand)
router.post('/search', getLandsBySearch)
router.post('/buy/request', requestBuyLand)
router.post('/buy', confirmBuyLand)

module.exports = router
