require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = new Express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(process.env.PORT || 3001, () =>{
    console.log('App is running')
})

app.use('/', Express.static('./src'))

app.get('/model', (req, res) => {
    TodoL.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

app.post('/model', (req, res) => {
    console.log(req.query)
    
    let qData = []

    TodoL.find({}, (err, data) =>{
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

    TodoL.create({
    todo: req.query.todo,
    complete: req.query.complete,
    category: req.query.category,
    categoryID: catLength + 1
    })

    res.sendStatus(200)
})

app.put('/model/:id', (req, res) =>{
    TodoL.findById(req.params.id, (err, items) =>{
        if(err){console.log(handleError(err))}
        items.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            TodoL.find({}, (err, itemsX) =>{
                if(err){console.log(handleError(err))}
                res.json(itemsX)
            })
        })
    })
})

app.delete('/model/:id', (req, res) =>{
    console.log(`This is the delete route: ${req.params.id}`)
    TodoL.remove({id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        TodoL.find({}, (err, items) =>{
            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
})