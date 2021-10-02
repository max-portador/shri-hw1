const { EventEmitter } = require('events')
const { existsSync } = require('fs')
const { dbDumpFile } = require('../config')
const { writeFile } = require('../utils/fs')
const { prettifyJsonToString} = require('../utils/prettifyJsonToString')
const Img = require('./Img')

class DataBase extends EventEmitter {
    constructor() {
        super();
        this.idToImg = {}
    }

    async initFromDump() {
        if (existsSync(dbDumpFile) === false) {
            return;
        }

        const dump = require(dbDumpFile)

        if (typeof dump.idToImg === 'object') {
            this.idToImg = {};
            
            for (let id in dump.idToImg) {
                const img = dump.idToImg[id]

                this.idToImg[id] = new Img(img.size, img.id, img.uploadedAt)
            }
        }
    }

    async insert(img, originalContent) {
        await img.saveOriginal(originalContent)

        this.idToImg[img.id] = img;

        this.emit('changed')

    }

    async remove(imgId) {
        if (imgId in this.idToImg) {

            const imgRaw = this.idToImg[imgId]

            const img = new Img(imgRaw.size, imgRaw.id, imgRaw.uploadedAt)
            await img.removeOriginal();

            delete this.idToImg[imgId];
            this.emit('changed');

            return img;

        } else {

            return null
        }


    }

    findOne(ImgId) {
        const imgRaw = this.idToImg[ImgId];

        if (!imgRaw) {
            return null;
        }

        const img = new Img(imgRaw.size, imgRaw.id, imgRaw.uploadedAt);

        return img;
    }

    find() {
        let allImgs = Object.values(this.idToImg)

        allImgs.sort((imgA, imgB) => imgB.uploadedAt - imgA.uploadedAt)

        return allImgs
    }

    toJSON() {
        return {
        idToImg: this.idToImg,
        }
      }

}


const db = new DataBase()

db.initFromDump()

db.on('changed', () => {
    writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()))
})

module.exports = db