// API Conf
const express = require('express')
const app = express()
const port = 2099

app.use(express.json())

// Mongodb Conf
const mongodb = require('mongodb')
// Membuat koneksi ke mongodb
const MongoClient = mongodb.MongoClient

const URL = "mongodb://127.0.0.1:27017"
const databaseName = 'bdg-mongodb'


MongoClient.connect(URL, {}, (err, client) => {
    if (err) {
        return console.log(err)
    }

    const db = client.db(databaseName)
})

app.listen(port, () => {
    console.log("API success running on port " + port)
})

// callback function pada listen akan di running ketika berhasil menjalankan API