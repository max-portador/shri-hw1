const { Router } = require('express')
const homePage = require('../handlers/homePage')
const {upload, uploadImage} = require('../handlers/upload')
const getList = require('../handlers/list')
const getImage = require('../handlers/getImage')
const deleteImage = require('../handlers/deleteImage')
const mergeImages = require('../handlers/mergeImages')


const router = Router()

router.get('/', homePage)

router.post('/upload', upload.single('image'), uploadImage)

router.get('/list', getList)

router.get('/image/:id', getImage)

router.delete('/image/:id', deleteImage)

router.get('/merge', mergeImages)

module.exports = router