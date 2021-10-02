const db = require('../entities/Database')
const path = require("path");
const {imagesFolder} = require("../config");
const {removeFile, exists}= require('../utils/fs')


const deleteImage = async(req, res) => {
  const img = await db.remove(req.params.id)

  if (img) {
    res.send("Изображение с таким ID удалено")
  }
  else {
    res.status(404).send("В базе нет изображения с таким ID")
  }
}

module.exports = deleteImage