const path = require('path')

const { imagesFolder } = require('../config')
const { writeFile, removeFile } = require('../utils/fs')
const { generateId } = require('../utils/generateId')

module.exports = class Img{
    constructor(size, id, uploadedAt) {
        this.id = id || generateId()
        this.size = size
        this.uploadedAt = uploadedAt || Date.now()

        this.originalFilename = `${this.id}_original.jpg`
    }

    async saveOriginal(content) {
        await writeFile(path.resolve(imagesFolder, this.originalFilename), content);
    }

    async removeOriginal() {
        await removeFile(path.resolve(imagesFolder, this.originalFilename))
    }

    toPublicJSON() {
        return {
            id: this.id,
            originalUrl: `/files/${this.id}_original.svg`,
            uploadedAt: this.uploadedAt,
            size: this.size,
        }
    }

    toJSON() {
        return {
            id: this.id,
            uploadedAt: this.uploadedAt,
            size: this.size,
        }
    }
}