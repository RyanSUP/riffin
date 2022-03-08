import { Router } from "express"
import * as collectionsCtrl from '../controllers/collections.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// GET - localhost:3000/collections
router.get('/', isLoggedIn, collectionsCtrl.index)

// GET - localhost:3000/collections/:id
router.get('/:id', isLoggedIn, collectionsCtrl.show)

// POST - localhost:3000/collections/:id
router.delete('/:id', collectionsCtrl.delete)

export {
    router
}