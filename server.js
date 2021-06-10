const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    
    if (req.files === null) {
        if (req.body === 'null') {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        download(req.body.Link)
    } else {
        const file = req.files.file;
        const filename = uuidv4()
        file.mv(`${__dirname}/client/src/uploads/${filename}.jpg`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            
            res.json({ fileName: `${filename}.jpg`, filePath: `/uploads/${filename}.jpg` });
        });

    }

});

app.post('/readupload', (req,res) => {
    const ImgStat =  ReadAllImage(`${__dirname}/client/src/uploads`)
    res.send(ImgStat)
})

function ReadAllImage(path) {
    var imgData = []
    const imageFolder = fs.readdirSync(path)
    imageFolder.forEach(imageName => {
        const imgStat = fs.statSync(`${path}/${imageName}`)
        imgData.push({imagename: imageName, creted_date: imgStat.birthtime})
    })
    return imgData
}

async function download(url) {
    const writer = fs.createWriteStream(`${__dirname}/client/src/uploads/image${uuidv4()}.jpg`)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
    
}

app.post('/delImg', (req,res) => {
    const path = `${__dirname}/client/src/uploads/${req.body.name}`
    try {
        fs.unlinkSync(path)
        return res.send("deleted image")
      } catch(err) {
        console.error(err)
        return res.status(400).json({ msg: err });
      }
    
})

app.listen(5000, () => console.log('Server Started...'));