const { replaceBackground } = require("backrem")
const db = require('../entities/Database')
const absPath = require("../utils/getFullPath");
const {exists} = require("../utils/fs")
const fs = require('fs')
const path = require('path');

async function prepareID (imgId) {
  const img = db.findOne(imgId)

  if (!img) {
    return null
  }
  const originalFilename = img.originalFilename
  const aPath = absPath(originalFilename)

  return await exists(aPath) ? fs.createReadStream(aPath) : null
}


function checkKeys(obj) {
  return ['front', 'back', 'color', 'threshold']
    .every(key => key in obj)
}


const mergeImages = async (req, res) => {
    const front = fs.createReadStream(absPath(db.findOne(req.query.front).originalFilename))
    const back =  fs.createReadStream(absPath(db.findOne(req.query.back).originalFilename))

    const color = req.query.color.split(",").map(d => +d)
    const threshold = +req.query.threshold

    res.contentType('jpg')
    replaceBackground(front, back, color, threshold)
      .then( (result) => {
        result.pipe(res)
      })



}


module.exports = mergeImages