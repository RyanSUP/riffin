import { Profile } from '../models/profile.js'

const show = (req, res) => {
    Profile.findById(req.params.id)
    .populate('tabs')
    .exec((error, profile) => {
        console.log(profile)
    })
}

export {
    show,
}