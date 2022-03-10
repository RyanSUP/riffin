import { Profile } from '../models/profile.js'

const show = (req, res) => {
    Profile.findById(req.params.id)
    .populate('tabs')
    .exec((error, profile) => {
        if(profile._id.equals(req.user.profile._id)) {
            res.render('profiles/show', {
                title: `My riffs`,
                tabs: profile.tabs
            })
        } else {
            res.redirect('/tablatures/index')
        }
    })
}

export {
    show,
}