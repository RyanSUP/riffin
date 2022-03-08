import { Router } from "express"
import * as collectionsCtrl from '../controllers/collections.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// GET - localhost:3000/collections
router.get('/', isLoggedIn, collectionsCtrl.index)

// POST - localhost:3000/collections
router.post('/', isLoggedIn, collectionsCtrl.create)

// GET - localhost:3000/collections/:id
router.get('/:id', isLoggedIn, collectionsCtrl.show)

// delete - localhost:3000/collections/:id
router.delete('/:id', collectionsCtrl.delete)

export {
    router
}