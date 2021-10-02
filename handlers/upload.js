const multer = require('multer')
const db = require('../entities/Database')
const Img = require("../entities/Img")

const upload = multer()

const uploadImage = async function(req, res) {

  const file = req.file

  try {
    const img = new Img(file.size)
    await db.insert(img, file.buffer)
    res.send({
        id: img.id
      })
  } catch (err) {
    console.log(err)
    res.status(404).end()
  }
}

module.exports = {
  upload,
  uploadImage
}
