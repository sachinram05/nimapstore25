const express = require("express");
const productRoutes = require('./routes/productRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const { connectDB } = require("./config/db.js");
const cors = require('cors');

(async () =>
    await connectDB()
)();

const app = express();
app.use(cors())
app.use(express.json());



app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)

const PORT = 5000;


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
