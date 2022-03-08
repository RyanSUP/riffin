import mongoose from "mongoose"

const Schema = mongoose.Schema

const tablatureSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile',
    },
    name: {
        type: String,
        default: 'a tasty lick'
    },
    notesOnStrings: [String],
    public: { 
        type: Boolean, 
        default: false
    },
    folder: {
        type: Schema.Types.ObjectId, 
        ref: 'Collection',
        default: null,
    },
},  { timestamps: true })

const Tablature = mongoose.model('Tablature', tablatureSchema)

export {
    Tablature
}