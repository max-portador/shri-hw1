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
  if (checkKeys(req.query)){
      const front = await prepareID(req.query.front)
      const back = await prepareID(req.query.back)

      if (front && back) {
          const color = req.query.color.split(",").map(d => +d)
          const threshold = +req.query.threshold

        try {
           const result = await replaceBackground(front, back, color, threshold)
          result.pipe(res)

        } catch (err) {
          res.status(404).send()
        }}}

    else {
      res.status(404).end()
    }}

module.exports = mergeImages