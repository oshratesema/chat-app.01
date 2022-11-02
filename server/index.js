const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouters = require('./routers/usersRouters')
const usersControllers = require('./controllers/avatarsController')

const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json());

app.use('/api/auth/', userRouters)
app.use('/api/auth/', usersControllers)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Successfully');
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})