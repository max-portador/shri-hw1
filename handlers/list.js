const db = require('../entities/Database')

const getList = (req, res) => res.json(db.find())

module.exports = getList