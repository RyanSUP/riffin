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

const create = (req, res) => {
    req.body.owner = req.user.profile._id
    const collection = new Collection(req.body)
    collection.save()
    .then(()=> {
        res.redirect('/collections')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/collections')
    })
}

export {
    index,
    create,
}