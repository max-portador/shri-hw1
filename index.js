const express = require('express')
const path = require('path')

const router = require('./routes/router')
const { imagesFolder, PORT } = require('./config')


const app = express()

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.json())
app.use('/files', express.static(imagesFolder))
app.use(router)



async function start() {
    app.listen(PORT, () => {
        console.log('Server has been started at port ' + PORT);
    })
}

start()

