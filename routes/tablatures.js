import { Router } from "express"
import * as tablaturesCtrl from '../controllers/tablatures.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


// GET - localhost:3000/tablatures
router.get('/trending', tablaturesCtrl.index)

// GET - localhost:3000/tablatures/new
router.get('/new', isLoggedIn, tablaturesCtrl.new)

// POST - localhost3000/tablature
router.post('/', isLoggedIn, tablaturesCtrl.create)


export {
    router
}