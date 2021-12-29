import fs from 'fs'
import dotentv from 'dotenv'
import mime from 'mime-types'
dotentv.config()

class FilesController {
    uploadFile = (req, res) => {
        if(!req.files) {
            return res.status(400).send({message: 'No recibido'})
        }

        const file = req.files.foo
        const directory = req.query.path
        console.log(file)
        let path
        if(directory === undefined) {
            path = `${process.env.CLOUD_PATH}/${file.name}`
        }
        else {
            const directory_path = directory.replaceAll('-', '/')
            path = `${process.env.CLOUD_PATH}/${directory_path}/${file.name}`
        }

        file.mv(path, (err) => {
            if(err) return res.status(500).send(err)
            res.send({message: 'recibido'}) 
        })
    }

    createDirectory = (req, res) => {
        const directory = req.query.path
        const {newDirectory} = req.body
        let path
        if(directory === undefined) {
            path = `${process.env.CLOUD_PATH}`
        }
        else {
            const directory_path = directory.replaceAll('-', '/')
            path = `${process.env.CLOUD_PATH}/${directory_path}`
        }

        const formatedDirectory = newDirectory.replaceAll(' ', '_')
        fs.mkdir(`${path}/${formatedDirectory}`, () => {
            res.send({message: 'directorio creado'}) 
        })
    }
    
    getFiles = (req, res) => {
        const directory = req.query.path
        console.log(directory)
        let path
        let path_response
        if(directory === undefined) {
            path = `${process.env.CLOUD_PATH}`
            path_response = '/'
        }
        else {
            const directory_path = directory.replaceAll('-', '/')
            path = `${process.env.CLOUD_PATH}/${directory_path}`
            path_response = `/${directory_path}`
        }
        fs.readdir(path, (err, archivos) => {
            if (err) return res.status(500).send(err)
            console.log(archivos);
            res.send({
                data: archivos,
                path: path_response
            }) 
        });
    }

    downloadFile = (req, res) => {
        
        try {
            const directory = req.query.path
            const {fileName} = req.body

            let path
            if(directory === undefined) {
                path = `${process.env.CLOUD_PATH}`
            }
            else {
                const directory_path = directory.replaceAll('-', '/')
                path = `${process.env.CLOUD_PATH}/${directory_path}`
            }
            const file = `${path}/${fileName}`

            res.download(file);
            //res.send(file)
        }
        catch (err){
            res.status(500).send(err)
        }
    }
}

export default FilesController