const db = require('../entities/Database')


const deleteImage = async(req, res) => {
  const imgId = req.params.id
  const img = await db.remove(imgId)

  if (img) {
    res.json({...img})
  }
  else {
    res.status(404).json({...img})
  }
}

module.exports = deleteImage