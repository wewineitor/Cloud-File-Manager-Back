import express from "express";
import cors from "cors"
import fileUpload from "express-fileupload";

const app = express()
const port = 4000

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(fileUpload()); 

app.use(require('./routes/FilesRoutes'))

app.listen(port, () => {
    console.log(`Server listen in port: ${port}`)
})