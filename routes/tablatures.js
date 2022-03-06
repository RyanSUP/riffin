import { Router } from "express"
import * as tablaturesCtrl from '../controllers/tablatures.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


// GET - localhost:3000/tablatures
router.get('/', tablaturesCtrl.index)

// POST - localhost3000/tablature
router.post('/', isLoggedIn, tablaturesCtrl.create)


export {
    router
}