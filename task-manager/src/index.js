const express = require('express')
const auth = require('./middleware/auth');
require('./db/mongoose')

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express()

const { restart } = require('nodemon')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))