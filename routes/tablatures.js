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

// POST - localhost:3000/tablatures/:id
router.post('/:id', isLoggedIn, tablaturesCtrl.update)

// Get - localhost:3000/tablatures/:id
router.get('/:id', tablaturesCtrl.show)

// DELETE - localhost:3000/tablatures/id
router.delete('/:id', tablaturesCtrl.delete)

export {
    router
}