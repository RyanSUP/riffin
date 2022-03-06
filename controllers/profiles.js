import { Profile } from '../models/profile.js'

const show = (req, res) => {
    Profile.findById(req.params.id)
    .populate('tabs')
    .exec((error, profile) => {
        res.render('profiles/show', {
            title: `${profile.name}'s licks`,
            tabs: profile.tabs
        })
    })
}

export {
    show,
}