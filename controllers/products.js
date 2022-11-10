
const express = require('express')
const router = express.Router()
const data = require("../models/seed")
const Product = require('../models/product.js')



router.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, products) => { })
  Product.create(data, (error, data) => {
    res.redirect("/products");
  });
})


router.get("/", (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render("index.ejs", { products: allProducts })
  })
})

router.get("/new", (req, res) => {
  res.render("new.ejs")
})

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    res.redirect("/products")
  })
})


router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,req.body, (err, product) => {
      // decrease the qty
      product.qty -= 1
      product.save()
      res.redirect(`/products/${req.params.id}`)
    })
  })


router.put("/order/:id", (req, res) => {

  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, product) => {
      product.qty -= 1
      product.save()
      res.redirect(`/products/${req.params.id}`)
    })
})


router.post("/", (req, res) => {
  Product.create(req.body, (err, createdProduct) => {
    res.redirect("/products")
  })
})

router.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {

    res.render("edit.ejs", {
      index: req.params.id,
      foundProduct: foundProduct,
    })
  })
})

router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {

    res.render("show.ejs", {
      products: foundProduct,
      title: foundProduct.name,
    })
  })
})

module.exports = router;