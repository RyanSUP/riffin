import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost:3000/profiles/
router.get('/:id', isLoggedIn, profilesCtrl.show)


router.get('/', isLoggedIn, profilesCtrl.index)


export {
    router
}

