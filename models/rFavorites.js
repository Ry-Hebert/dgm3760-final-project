const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const rFavoritesSchema = new Schema({
    id: Number,
    name: String,
    genre: String,
    category: String,
    genreID: Number
})

module.exports = Mongoose.model('rFavorites', rFavoritesSchema)