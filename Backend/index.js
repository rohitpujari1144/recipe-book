const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 5000

// getting all recipes information
app.get('/allRecipes', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        let recipes = await db.collection('All_Recipes').find().toArray()
        if (recipes.length) {
            res.status(200).send(recipes)
        }
        else {
            res.send({ message: "No recipes found" })
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

// getting all users information
app.get('/allUsers', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        let users = await db.collection('All_Users').aggregate([{ $sort: { userId: -1 } }]).toArray()
        if (users.length) {
            res.status(200).send(users)
        }
        else {
            res.send({ message: "No users found" })
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

// creating new user
app.post('/signup', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        req.body.userId = parseInt(req.body.userId)
        let user = await db.collection('All_Users').aggregate([{ $match: { email: req.body.email } }]).toArray()
        if (user.length) {
            res.send({ message: `Email address already exist` })
        }
        else {
            await db.collection('All_Users').insertOne(req.body)
            res.status(201).send({ message: 'User Registartion Successful', data: req.body })
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
app.put('/updateUser', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        if (req.query.securityCode === "") {
            await db.collection('All_Users').updateOne({ email: req.query.email }, { $set: req.body })
            res.status(200).send({ message: 'password updated successfully' })
        }
        else {
            let user = await db.collection('All_Users').aggregate([{ $match: { email: req.query.email, securityCode: req.query.securityCode } }]).toArray();
            if (user.length) {
                await db.collection('All_Users').updateOne({ email: req.query.email, securityCode: req.query.securityCode }, { $set: req.body })
                res.status(200).send({ message: 'User info updated successfully' })
            }
            else {
                res.send({ message: "Invalid credentials" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user login
app.get('/login', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        if (req.query.password === '') {
            let user = await db.collection('All_Users').aggregate([{ $match: { email: req.query.email } }]).toArray()
            if (user.length) {
                res.status(200).send({ message: 'Login Successful', data: user })
            }
            else {
                res.send({ message: 'Invalid credentials' })
            }
        }
        else {
            let user = await db.collection('All_Users').aggregate([{ $match: { email: req.query.email, password: req.query.password } }]).toArray()
            if (user.length) {
                res.status(200).send({ message: 'Login Successful', data: user })
            }
            else {
                res.send({ message: 'Invalid credentials' })
            }
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// recipes saved by user
// app.post('/saveRecipe', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = client.db('Recipe_Book')
//         await db.collection('saved recipes').insertOne(req.body)
//         res.status(201).send({ message: 'Recipe successfully saved', data: req.body })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// get all saved recipes
// app.get('/allSavedRecipes', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         const db = client.db('Recipe_Book')
//         let recipes = await db.collection('saved recipes').find().toArray()
//         res.status(200).send(recipes)
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// delete account
app.delete('/deleteUser/:userId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        req.params.userId = parseInt(req.params.userId)
        await db.collection('All_Users').deleteOne({ userId: req.params.userId })
        // find().toArray()
        res.status(200).send({ message: "Account successfully deleted" })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// delete recipe
app.delete('/deleteRecipe/:recipeId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = client.db('Recipe_Book')
        req.params.recipeId = parseInt(req.params.recipeId)
        await db.collection('All_Recipes').deleteOne({ recipeId: req.params.recipeId })
        res.status(200).send({ message: "Recipe successfully deleted" })
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
// app.get('/getRecipe/:userEmail', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl)
//     try {
//         if (req.params.userEmail) {
//             const db = await client.db('recipes')
//             let recipe = await db.collection('saved recipes').find({ userEmail: req.params.userEmail }).toArray()
//             if (recipe) {
//                 res.status(200).send(recipe)
//             }
//             else {
//                 res.status(400).send({ message: `No recipes found with email Id ${req.params.userEmail}` })
//             }
//         }
//         else {
//             res.status(400).send({ message: 'Please provide email Id in params' })
//         }
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

app.listen(port, () => { console.log(`App listening on ${port}`) })
