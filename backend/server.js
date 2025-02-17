const express = require("express");
const productRoutes = require('./routes/productRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const userRoutes = require("./routes/userRoutes.js")
const { connectDB } = require("./config/db.js");
const cors = require('cors');

(async () =>
    await connectDB()
)();//IIFE

const app = express();

app.use(cors())

app.use(express.json());


//routes
app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/user",userRoutes)

const PORT = 5000;//PORT

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
