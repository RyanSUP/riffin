import { Tablature } from '../models/tablature.js'
import { Profile } from '../models/profile.js'

import * as tabScripts from '../public/scripts/tab-scripts.js'


const index = (req, res) => {
    Tablature.find({public: true})
    // ! Ok - after much frustration and googling I realized to populate I need to use the property name, not the ref name...
    .populate('owner')
    .exec((error, tabs) => {
        res.render('tablatures/index', {
            title: 'Gallery',
            tabs,
        })
    })
}

const newTablature = (req, res) => {
    res.render('tablatures/new', {
        title: 'Sick, a New Lick!'
    })
    .catch(error => {
        console.log(error)
        res.redirect('tablatures/new')
    })
}

const createTablature = (req, res) => {
    // Set the owner. User is added to req via middleware (passUserToView)
    req.body.owner = req.user.profile._id
    // Check if name is empty so I can make it null for default
    if(req.body.name === "") { req.body.name = undefined }
    // Force boolean value
    req.body.public = !!req.body.public
    // Obviously going to need to do more cleaning at some point so I'm setting up a tabScripts file.
    req.body.notesOnStrings = tabScripts.arrayifyTextareaInput(req.body.notesOnStrings)
    // Push the tab into the users Profile.tabs array
    const tab = new Tablature(req.body)
    tab.save()
    .then(()=> {
        Profile.findById(tab.owner)
        .then(profile => {
            profile.tabs.push(tab)
            profile.save(() => {
                res.redirect('/')
            })
        })
    })
    .catch(error => {
        console.log(error)
        // send back the stored tab so the user doesnt lose their lick if the save fails
        res.redirect('/tablatures/new', {workInProgress: req.body})
    })
}

const show = (req, res) => {

    Tablature.findById(req.params.id)
    .then(tab => {
        let userAuth
        if(req.user === undefined) {
            userAuth = 'guest'
        } else if(tab.owner.equals(req.user.profile._id)) {
            userAuth = 'owner'
        } else {
            userAuth = 'user'
        }
        res.render('tablatures/show', {
            title: tab.name,
            tab,
            userAuth,
        })
    })
    .catch(error => {
        console.log(error)
        isSelf ? 
        res.redirect(`/profile/${req.user.profile._id}`) : 
        res.redirect('/tablatures/trending')
    })
}

const update = (req, res) => {
    Tablature.findById(req.params.id)
    .then(tab => {
        if(tab.owner.equals(req.user.profile._id)) {
            tab.name = req.body.name
            tab.notesOnStrings = tabScripts.arrayifyTextareaInput(req.body.notesOnStrings)
            tab.save()
            .then(() => {
                res.redirect(`/tablatures/${req.params.id}`)
            })
        } else {
            throw new Error('Not authorized')
        }
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/tablatures/${req.params.id}`)
    })
}

export {
    index,
    createTablature as create,
    show,
    newTablature as new,
    update,
}