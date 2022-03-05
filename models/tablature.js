import mongoose from "mongoose"

const Schema = mongoose.Schema

const tablatureSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile',
    },
    notesOnStrings: [String],
    collections: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Collections',
        }
    ]
},  { timestamps: true })

const Tablature = mongoose.model('Tablature', tablatureSchema)

export {
    Tablature
}