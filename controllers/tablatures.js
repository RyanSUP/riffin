import { Tablature } from '../models/tablature.js'
import { Profile } from '../models/profile.js'

import * as tabScripts from '../public/scripts/tab-scripts.js'

const errorCallback = (error) => {
    console.log(error)
    res.redirect('/tablatures')
}

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
    tab.save(err => {
        // send back the stored tab so the user doesnt lose their lick if the save fails
        if(err) return res.redirect('/tablatures/new', {workInProgress: req.body}) 
        Profile.findById(tab.owner)
        .then(profile => {
            console.log(profile)
            profile.tabs.push(tab)
            profile.save(() => {
                res.redirect('/')
            })
        })
    })


    // Profile.findById(req.body.owner)
    // .then(profile => {
    //     Tablature.create(req.body)
    //     .then(tab => {
    //         profile.tabs.push(tab._id)
    //         profile.save()
    //         .then(()=> {
    //             // ! Dont forget to update this to /tablature/:id redirect
    //             res.redirect('/')
    //         })
    //     })
    // })
    // .catch(errorCallback)
}

const show = (req, res) => {

}

export {
    index,
    createTablature as create,
    show,
    newTablature as new,
}