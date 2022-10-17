const express = require("express")
const prodsRouter = require("./routes/products")
const app = express()
const port = process.env.PORT || 3000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/products",prodsRouter)

app.listen(port,()=>{
  console.log(`server running on port ${port}...`)
})
