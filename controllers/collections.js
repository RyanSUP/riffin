import { Collection } from '../models/collection.js'

const index = (req, res) => {
    Collection.find({owner: req.user.profile._id})
    .then(collections => {
        res.render('collections/index', {
            title: 'My collections',
            collections,
        })
    })
}

export {
    index,
}