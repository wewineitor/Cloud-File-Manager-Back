import express from "express";
import FilesController from '../controllers/FilesController'
const controller = new FilesController()
const router = express.Router()

router.post('/upload', controller.uploadFile)
router.post('/create-directory', controller.createDirectory)
router.get('/get-files', controller.getFiles)

module.exports = router