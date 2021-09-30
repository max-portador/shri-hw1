const express = require('express')
const path = require('path')
const fs = require("fs");

const {nanoid} = require('nanoid');
const { imagesFolder } = require('./config')




const PORT = 8080

const app = express()

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.json())
app.use('/files', express.static(imagesFolder))


const my_message = `You\`re breathtaking!!! ${nanoid()}`

app.get('/', (req, res) => {
    res.render('index', {title: 'SHRI Homework', message: my_message})
})

async function start() {
    app.listen(PORT, () => {
        console.log('Server has been started at port ' + PORT);

    })
}

start()

