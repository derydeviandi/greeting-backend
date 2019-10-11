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

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log(err)
    }

    const db = client.db(databaseName)

    // INIT DATA
    app.get('/initdata', (req, res) => {
        db.collection('users').insertMany([
            { name: 'Jhonny', age: 28 },
            { name: 'Deep', age: 38 },
            { name: 'Bean', age: 19 },
            { name: 'Dora', age: 22 },
            { name: 'Marvel', age: 32 },
            { name: 'Benjamin', age: 32 },
        ]).then((resp) => {
            res.send("<h1>Data Init berhasil di tambahkan</h1>")

        }).catch(() => {
            res.send("Gagal init data")

        })
    })

    // GET ONE DATA WITH QUERY
    app.get('/users/one', (req, res) => {
        // req.query = {name,age}
        let { age, name } = req.query

        age = parseInt(age)

        db.collection('users').findOne({ name, age })
            .then((resp) => {
                res.send(resp)

            }).catch((err) => {
                res.send(err)
            })
    })

    // GET ALL DATA WITH QUERY
    app.get('/users/many', (req, res) => {

        let { age } = req.query

        age = parseInt(age)

        db.collection('users').find({ age }).toArray()
            .then((resp) => {
                res.send(resp)

            }).catch((err) => {
                res.send(err)
            })
    })

    // Home
    app.get('/', (req, res) => {
        res.send('<h1>API Running di port 2099</h1>')
    })

    // Get All Data
    app.get('/users', (req, res) => {
        db.collection('users').find({}).toArray()
            .then((resp) => {
                if (resp.length === 0) {
                    return res.send({ message: "Data Kosong" })
                }
                res.send(resp)
            }).catch((err) => {
                res.send(err)
            })
    })


    // POST DATA
    app.post('/users', (req, res) => {

        let { name, role, age } = req.body
        db.collection('users').insertOne({ name, role, age })
            .then((resp) => {
                res.send({
                    message: "Data berhasil di input",
                    response: {
                        insertedData: resp.ops[0]
                    }
                })
            }).catch((err) => {
                res.send(err)
            })
    })

    // PUT (EDIT) DATA
    app.put('/users/:name', (req, res) => {
        // Kriteria 1
        // req.params.name
        db.collection('users').updateOne({
            name: req.params.name
        }, {
            $set: {
                name: req.body.name,
                age: req.body.age
            }
        }).then((resp) => {
            res.send(resp)

        }).catch((err) => {
            res.send(err)
        })

        // DATA BARU
        // req.body.name
        // req.body.age

    })




})



app.listen(port, () => {
    console.log("API success running on port " + port)
})

// callback function pada listen akan di running ketika berhasil menjalankan API


// TASK DAY 1
    // Get All Data

/*
TASK DAY 2
    1. Kirim pesan error ketika age kosong / tidak diisi data (get all query)
    2. Jika data tidak ditemukan maka kirim respon dalam bentuk obj yg memiliki property 'err',
        template pesan err = data dengan umur ... tidak ditemukan
    3. Kirim pesan error jika user tidak memberikan salah satu atau kedua data(name,age),
        template err = Mohon isi data untuk properti 'name', 'age' (get one data query)
    4. Jika data tidak ditemukan, kirim obj dengan property 'err',
        template err= Tidak dapat menemukan user dengan nama ... dan umur ...
    5. Kirim Pesan error jika name, role, age kosong, template err = Tolong isi data 'name', 'age', 'role' (post data)
    6. Delete one user by age

*/
