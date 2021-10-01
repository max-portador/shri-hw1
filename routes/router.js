const { Router } = require('express')
const upload = require('../middlewares/upload')
const fs = require('fs')
const db = require('../entities/Database')
const Img = require("../entities/Img")
const path = require("path");
const {imagesFolder} = require("../config");


const router = Router()

router.get('/', (req, res) => {
    const my_message = `You\`re breathtaking!!!`
    res.render('index', {title: 'SHRI Homework', message: my_message})
})

router.post('/upload', upload.single('image'), async(req, res) => {

    const file = req.file

    try {
        const img = new Img(file.size)
        await db.insert(img, file.buffer)

        res
            .status(200)
        .send({
            id: img.id
            })


    } catch (err) {
        res
            .status(500)
            .end(err)
    }
})

router.get('/list', (req, res) => {
    res.json(db.find())
})

router.get('/image/:id', (req, res) => {

    res.contentType('jpg')
    const img = db.findOne(req.params.id)

    if (!img) {return res.status(400)}

    const imgPath = path.resolve(imagesFolder, img.originalFilename)
    const readStream = fs.createReadStream(imgPath)

    readStream.pipe(res)
})
module.exports = router