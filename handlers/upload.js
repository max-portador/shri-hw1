const multer = require('multer')
const db = require('../entities/Database')
const Img = require("../entities/Img")

const upload = multer()

const uploadImage = async function(req, res) {

  const file = req.file

  try {
    const img = new Img(file.size)
    await db.insert(img, file.buffer)
    res.json({
        id: img.id
      })
  } catch (err) {
    res.status(404).send(err)
  }
}

module.exports = {
  upload,
  uploadImage
}
