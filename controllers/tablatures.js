import { Tablature } from '../models/tablature.js'
import { Profile } from '../models/profile.js'
import { Collection } from '../models/collection.js'

import * as tabScripts from '../public/scripts/tab-scripts.js'


const index = (req, res) => {
    Tablature.find({public: true})
    // ! Ok - after much frustration and googling I realized to populate I need to use the property name, not the ref name...
    .populate('owner')
    .exec((error, tabs) => {
        res.render('tablatures/index', {
            title: 'Riff - Trending',
            tabs,
        })
    })
}

const newTablature = (req, res) => {
    Collection.find({})
    .then(collections => {
        res.render('tablatures/new', {
            title: 'Riff - New',
            collections,
        })
    })
}

const createTablature = (req, res) => {
    // Set the owner. User is added to req via middleware (passUserToView)
    req.body.owner = req.user.profile._id
    // Check if name is empty so I can make it null for default
    if(req.body.name === "") { req.body.name = undefined }
    // Force boolean value
    req.body.public = !!req.body.public
    // Handle tab inputs
    req.body.rawInput = tabScripts.arrayifyRawInput(req.body.rawInput)
    req.body.notesOnStrings = tabScripts.fillNotesOnStrings(req.body.rawInput)
    req.body.tabGrid = tabScripts.arrayifyRawInput(req.body.tabGrid)
    // Check the collection
    if(req.body.folder === 'null') {
        req.body.folder = undefined
    }
    // Push the tab into the users Profile.tabs array
    const tab = new Tablature(req.body)
    tab.save()
    .then(()=> {
        if(req.body.folder) {
            Collection.findById(req.body.folder)
            .then(collection => {
                collection.tabs.push(tab)
                collection.save()
            })
        }
        Profile.findById(tab.owner)
        .then(profile => {
            profile.tabs.push(tab)
            profile.save(() => {
                res.redirect(`/tablatures/${tab.id}`)
            })
        })
    })
    .catch(error => {
        console.log(error)
        // send back the stored tab so the user doesnt lose their lick if the save fails
        res.redirect('/tablatures/new')
    })
}

const show = (req, res) => {

    Tablature.findById(req.params.id)
    .then(tab => {
        Collection.find()
        .then(collections => {
            let userAuth
            if(req.user === undefined) {
                userAuth = 'guest'
            } else if(tab.owner.equals(req.user.profile._id)) {
                res.redirect(`/tablatures/<%= tab._id/edit %>`)
            } else {
                userAuth = 'user'
            }
            res.render('tablatures/show', {
                title: `Riff - ${tab.name}`,
                collections,
                tab,
                userAuth,
            })
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
    // Need to update collection
    // If collection value = "", remove collection
    Tablature.findById(req.params.id)
    .then(tab => {
        if(tab.owner.equals(req.user.profile._id)) {
            if(req.body.folder === 'null' || req.body.folder === 'current') {
                // do nothing
            } else if(req.body.folder === 'remove') {
                // tab IS in a collection
                // tab wants NO collection
                // remove tab from collection
                // remove collection from tab
                Collection.updateOne({_id: tab.folder}, {$pull: {tabs: tab._id}}, (error)=>{
                    console.log(error)
                    if(error) res.redirect(`/tablatures/${tab._id}`)
                })
                tab.folder = null
            } else if(req.body.folder !== tab.folder) {
                // a new collection was selected
                // therefore collection is changing.
                // if tab is currently in a collection
                if(tab.folder !== null) {
                    // remove tab from the collection
                    Collection.updateOne({_id: tab.folder}, {$pull: {tabs: tab._id}}, (error)=>{
                        console.log(error)
                        if(error) res.redirect(`/tablatures/${tab._id}`)
                    })
                }
                // add tab to new collection
                Collection.findById(req.body.folder)
                .then(collection => {
                    collection.tabs.push(tab)
                    collection.save()
                })
                tab.folder = req.body.folder
            }

            // Remove tab from collection

            tab.name = req.body.name
            tab.public = !!req.body.public
            tab.rawInput = tabScripts.arrayifyRawInput(req.body.rawInput)
            req.body.rawInput = tabScripts.arrayifyRawInput(req.body.rawInput)
            req.body.notesOnStrings = tabScripts.fillNotesOnStrings(req.body.rawInput)
            req.body.tabGrid = tabScripts.arrayifyRawInput(req.body.tabGrid)
            tab.rawInput = req.body.rawInput
            tab.notesOnStrings = req.body.notesOnStrings
            tab.tabGrid = req.body.tabGrid
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

// ! At some point I'll need to make sure tabs are removed from collections too'
// ! and profile!
const deleteTab = (req, res) => {
    Tablature.findById(req.params.id)
    .then(tab => {
        if(tab.owner.equals(req.user.profile._id)) {
            tab.delete()
            .then(()=> {
                res.redirect(`/profiles/${req.user.profile._id}`)
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

const edit = (req, res) => {
    Tablature.findById(req.params.id)
    .then(tab => {
        if(tab.owner.equals(req.user.profile._id)) {
            Collection.find()
            .then(collections => {
                res.render('tablatures/edit', {
                    tab, 
                    title: 'Riff - Edit',
                    collections,
                })
            })
        }
    })
}

export {
    index,
    createTablature as create,
    show,
    newTablature as new,
    update,
    deleteTab as delete,
    edit
}