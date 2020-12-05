require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')
const rFavorites = require('./models/rFavorites')

const app = new Express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(process.env.PORT || 3001, () =>{
    console.log('App is running')
})

app.use('/', Express.static('./public'))

app.get('/model', (req, res) => {
    rFavorites.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

app.post('/model', (req, res) => {
    console.log(req.query)
    
    let qData = []

    rFavorites.find({}, (err, data) =>{
        if(err){console.log(err)}
        else{
            console.log(data)
            qData.push(data)
        }
    })

    let catSize = qData.filter(item =>{
        return item.category === req.query.category
    })
    
    let catLength = catSize.length

    rFavorites.create({
    todo: req.query.todo,
    complete: req.query.complete,
    category: req.query.category,
    categoryID: catLength + 1
    })

    res.sendStatus(200)
})

app.put('/model/:id', (req, res) =>{
    rFavorites.findById(req.params.id, (err, items) =>{
        if(err){console.log(handleError(err))}
        items.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            rFavorites.find({}, (err, itemsX) =>{
                if(err){console.log(handleError(err))}
                res.json(itemsX)
            })
        })
    })
})

app.delete('/model/:id', (req, res) =>{
    console.log(`This is the delete route: ${req.params.id}`)
    rFavorites.remove({id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        rFavorites.find({}, (err, items) =>{
            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
})