const express = require('express')
const app = express()
const mongoose = require('mongoose')
//when you move dependencies around and refactor just go ahead and delete ones that are no longer be used in the file
const seedData = require('./models/seed.js')
const Product = require('./models/product.js')
const methodOverride = require("method-override")
const productsController = require ("./controllers/products")

require('dotenv').config()

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use("/products", productsController)

const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});