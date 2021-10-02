const path = require("path");
const { imagesFolder } = require("../config");

const absPath = (filename) =>  path.resolve(imagesFolder, filename)

module.exports = absPath