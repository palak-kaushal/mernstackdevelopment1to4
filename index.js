const express =  require("express")
const app = express()
require("dotenv").config()
const db = require("./server/config/db")
const route = require("./server/routes/route")
const {createAdmin} = require("./server/config/seed")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",route)
createAdmin()
db()


const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running at port number http://localhost:${port}`)
})