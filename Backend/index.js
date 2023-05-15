const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const client = new MongoClient(dbUrl)
const port = 5000

// getting all recipes information
app.get('/allRecipes', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('recipes')
        let recipe = await db.collection('recipes').find().toArray()
        res.status(200).send(recipe)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all users information
app.get('/allUsers', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('recipes')
        let users = await db.collection('users').find().toArray()
        res.status(200).send(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// creating new user
app.post('/userSignUp', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        if (req.body.name && req.body.email && req.body.username && req.body.password) {
            const db = await client.db('recipes')
            let user = await db.collection('users').findOne({ email: req.body.email })
            if (!user) {
                let username = await db.collection('users').findOne({ username: req.body.username })
                if (!username) {
                    await db.collection('users').insertOne(req.body)
                    res.status(201).send({ message: 'User Registartion Successful', data: req.body })
                }
                else {
                    res.status(400).send({ message: `User with username ${req.body.username} already exist` })
                }
            }
            else {
                res.status(400).send({ message: `User with ${req.body.email} already exist` })
            }
        }
        else {
            res.status(400).send({ message: 'name, email, username, password are mandatory' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// editing user information
app.put('/updateUser/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        if (req.params.email) {
            const db = await client.db('recipes')
            let user = await db.collection('users').findOne({ email: req.params.email })
            if (user) {
                let user = await db.collection('users').updateOne({ email: req.params.email }, { $set: req.body })
                res.status(200).send({ message: 'User info updated successfully' })
            }
            else {
                res.status(400).send({ message: `User not found with email ${req.params.email}` })
            }
        }
        else {
            res.status(400).send({ message: 'email is mandatory' })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user login
app.get('/userLogin/:username/:password', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        if (req.params.username && req.params.password) {
            const db = await client.db('recipes')
            let user = await db.collection('users').findOne({ username: req.params.username, password: req.params.password })
            if (user) {
                res.status(200).send({ message: 'Login Successful', data: user })
            }
            else {
                res.status(400).send({ message: `User not found with username ${req.params.username} and password ${req.params.password}` })
            }
        }
        else {
            res.status(400).send({ message: 'email and password are mandatory' })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// recipes saved by user
app.post('/saveRecipe', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('recipes')
        await db.collection('saved recipes').insertOne(req.body)
        res.status(201).send({ message: 'Recipe successfully saved', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// get all saved recipes
app.get('/allSavedRecipes', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('recipes')
        let recipes = await db.collection('saved recipes').find().toArray()
        res.status(200).send(recipes)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting recipes saved by particular user
app.get('/getRecipe/:userEmail', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        if (req.params.userEmail) {
            const db = await client.db('recipes')
            let recipe = await db.collection('saved recipes').find({ userEmail: req.params.userEmail }).toArray()
            if (recipe) {
                res.status(200).send(recipe)
            }
            else {
                res.status(400).send({ message: `No recipes found with email Id ${req.params.userEmail}` })
            }
        }
        else {
            res.status(400).send({ message: 'Please provide email Id in params' })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

app.listen(port, () => { console.log(`App listening on ${port}`) })
