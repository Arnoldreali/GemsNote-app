const mongoose = require('mongoose')

const { Schema } = mongoose

const SpecsSchema = new Schema({
    faces: { type: Number, required: true},
    color:  { type: String, required: true},
    rarity: { type: Number, required: true},
    shine: { type: Number, required: true},
})

const ImageSchema = new Schema({
    url: {type: String, required: true},
    number:{type: Number, required: true} 
})

const ReviewSchema = new Schema({
    stars: {type: Number, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    createdOn: { type: Date, default: Date.now}
})

const gemSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    canPurchase: { type: Boolean, required: true},
    specs: { type: SpecsSchema, required: true}, 
    images: { type: [ImageSchema], required:true },
    reviews: {type: [ReviewSchema], required: true},
    creationDate: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Gem', gemSchema )