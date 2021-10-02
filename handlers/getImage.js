const db = require('../entities/Database')
const absPath = require("../utils/getFullPath");
const fs = require('fs')

const getImage = (req, res) => {

  const img = db.findOne(req.params.id)

  if (img) {
      res.contentType('jpg')
      const imgPath = absPath(img.originalFilename)
      const readStream = fs.createReadStream(imgPath)

      readStream.pipe(res)

  } else {
      res.status(404).send("В базе нет изображения с таким ID")
  }
}

module.exports = getImage