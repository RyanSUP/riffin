import { Router } from "express"
import * as tablaturesCtrl from '../controllers/tablatures.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// POST - localhost3000/tablature
router.post('/', isLoggedIn, tablaturesCtrl.create)

export {
    router
}