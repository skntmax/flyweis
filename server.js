require('dotenv').config()
const express =require('express') 
const bodyParser =require('body-parser') 
const app = express()
const router=  require('./router/router')
app.use(express.json())
app.use(router)
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/home", (req,res)=>{
     // const supportModel =  new supportModel({ })
   res.send("get")
      
})   

app.listen(3001, ()=>{
     console.log("server running at port 3001 "  )
} )