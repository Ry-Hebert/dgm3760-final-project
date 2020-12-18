const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const rFavoritesSchema = new Schema({
    id: Number,
    name: String,
    cuisine: String,
    category: String,
    genreID: Number
})

module.exports = Mongoose.model('rFavorites', rFavoritesSchema)