import { Collection } from '../models/collection.js'

const index = (req, res) => {
    Collection.find({owner: req.user.profile._id})
    .populate('tabs')
    .then((collections) => {
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

const show = (req, res) => {
    Collection.findById(req.params.id)
    .populate('tabs')
    .then(collection => {
        res.render('collections/show', {
            collection,
            tabs: collection.tabs,
            title: `${collection.name} licks`
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/collections')
    })
}

const deleteCollection = (req, res) => {
    Collection.findById(req.params.id)
    .then(collection => {
        if(collection.owner.equals(req.user.profile._id)) {
            collection.delete()
            .then(()=> {
                res.redirect('/collections')
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.redirect('/collections')
    })
}

export {
    index,
    create,
    show,
    deleteCollection as delete,
}