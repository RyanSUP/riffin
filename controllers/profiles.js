import { Profile } from '../models/profile.js'
import { Tablature } from '../models/tablature.js'

const show = (req, res) => {
    Profile.findById(req.params.id)
    .then(profile => {
        Tablature.find({owner: profile.id, public: true})
        .populate('owner')
        .exec((error, tabs) => {
            res.render('profiles/show', {
                title: `${profile.name}'s riffs`,
                tabs,
                profile,
            })
            if(error) {
                console.log(error)
                res.redirect('/tablatures')
            }
        })
    })
}

const index = (req, res) => {
    Profile.findById(req.user.profile._id)
    .populate('tabs')
    .exec((error, profile) => {
        res.render('profiles/index', {
            title: `My riffs`,
            tabs: profile.tabs
        })
    })
}

export {
    show,
    index,
}