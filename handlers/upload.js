const multer = require('multer')
const db = require('../entities/Database')
const Img = require("../entities/Img")

const upload = multer()

const uploadImage = async function(req, res) {

    const file = req.file

    const img = new Img(file.size)
    await db.insert(img, file.buffer)
    res.json({ id: img.id })

}

module.exports = {
    upload,
    uploadImage
}
