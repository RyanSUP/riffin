import { Tablature } from '../models/tablature.js'
import * as tabScripts from '../public/scripts/tab-scripts.js'

const errorCallback = (error) => {
    console.log(error)
    res.redirect('/')
}

const index = (req, res) => {

}

const create = (req, res) => {
    // Set the owner. User is added to req via middleware (passUserToView)
    req.body.owner = req.user.profile._id
    // Check if name is empty so I can make it null for default
    if(req.body.name === "") { req.body.name = undefined }
    // Force boolean value
    req.body.public = !!req.body.public
    // Obviously going to need to do more cleaning at some point so I'm setting up a tabScripts file.
    req.body.notesOnStrings = tabScripts.arrayifyTextareaInput(req.body.notesOnStrings)
    Tablature.create(req.body)
    .then(tab => {
        res.redirect('/')
    })
    .catch(errorCallback)
}

export {
    index,
    create,
}