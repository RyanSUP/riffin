import mongoose from "mongoose"

const Schema = mongoose.Schema

const collectionSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile',
    },
    name: String,
    tabs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tablature'
        }
    ]
},  { timestamps: true })

const Collection = mongoose.model('Collections', collectionSchema)

export {
    Collection
}