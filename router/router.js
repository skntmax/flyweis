require('dotenv').config()
const cors = require('cors');
const fs= require('fs')
const bcrypt= require('bcrypt')
const axios= require('axios'); 
const express= require('express')
const sendmail = require('./sendmail')
const router =require('express').Router() 
const models  = require('./../databse/db');
const { model } = require('mongoose');

var corsOptions = {
    origin: "*" ,
    optionsSuccessStatus: 200 ,
    methods: [
        'GET',
        'POST',
      ],
      allowedHeaders: [
        'Content-Type',
      ] 
}
router.use(cors(corsOptions)); 

router.post("/signup" ,async(req,res)=>{
     if(req.body.firstname &&
         req.body.lastname &&
          req.body.username &&
           req.body.email && req.body.password){
                
            const all_data =await  models.user.find({})
            if(all_data==""){
                const plane_pass=req.body.password
                let hashpassword=await bcrypt.hash(`${req.body.password}` , 10 ) 
                req.body.password=hashpassword 
                const addeduser = new models.user (req.body)
                await addeduser.save()
                // await sendmail(req.body.email ,plane_pass)
                const cu_data =await  models.user.findOne({email:req.body.email})
                res.send(  {
                    "success":1,
                    "message": "succesful"                             
                } )  
            
            }
            
            else{
                all_data.map(async (ele,index)=>{
                     if(ele.username!=req.body.username && ele.email!=req.body.email  ){
                        const plane_pass=req.body.password
                        let hashpassword=await bcrypt.hash(`${req.body.password}` , 10 ) 
                        req.body.password=hashpassword 
                        const addeduser = new models.user(req.body)
                        addeduser.save()
                        // await sendmail(req.body.email, plane_pass)
                     const cu_data =await  models.user.find({email:ele.email})
                     await res.send(  {
                        "success":1,
                        "message": " succesfull "                             
                    } )
                     
                }
                     else{
                        res.send(  {
                            "success":0,
                            "message": " Email or username already exist  "                             
                        } )
                     }
                })
           } 

        }

})

router.post('/login',async (req,res)=>{ 
    //    if(  req.body.email && req.body.password   ){
        const u_data=await models.user.find( {email:`${req.body.email}`} )
        if(u_data!=""){
        if(req.body.email==u_data[0].email )   {
             const user_data=await models.user.find({email:`${req.body.email}`}) 
            const ismatch= await bcrypt.compare (req.body.password ,user_data[0].password)
             if(ismatch) 
                 res.json({
                     "id" :user_data[0]._id,  
                     "success":1,
                     "message": " succesfully logged in ",                             
                 })
             else{
                res.send(  {
                    "success":0,
                    "message": " Invalid password "                             
                } )
             }
                    
        }       
       }
       else{
        res.send(  {
            "success":0,
            "message": " Please Sign up first  "                             
        } )
       }
})   


router.post('/contact' ,async (req,res)=>{
     
   const data ={
        yourname: req.body.yourname ,
        email:  req.body.email , 
        phone: req.body.phone ,
        sub:  req.body.sub , 
        msg:  req.body.msg  
   }

   const result=await  sendmail(data.email,data)
    if(result){
        res.json({
            "success":1,
            "message": " response recorded succesfully "
         })     
    }else{
        res.json({
            "success":0,
            "message": "response recorded succesfully  "
         })
    }
    
    
})



router.post('/ask' ,async (req,res)=>{
     
    const data ={
         yourname: req.body.name ,
         email:  req.body.email , 
         phone: req.body.phone ,
         services:  req.body.services , 
         msg:  req.body.msg  
    }
 
    const result =await sendmail(data.email,data)
     
    if(result){
         res.json({
             "success":1, 
             "message": " response recorded succesfully  "
          })     
     }else{
        res.json({
            "success":0,
            "message": "  response recorded succesfully  "
         })  
     }
    
 })
 
 router.post('/connect'  , async (req,res)=>{ 
    const data = {
firstname  , lastname  , email    , course   , courseType   , message   }  
= req.body
 
const user_data=await models.connection.find({email:`${req.body.email}`}) 
if(user_data==""){
    const result = new models.connection({
        firstname: firstname , 
        lastname:data.lastname , 
        email: data.email, 
         course:data.course,
         coursType:data.courseType,
        message:data.message,
    })
      if(await result.save()) {
        res.json({
            "success":1,
            "message": " connected  "
         })    
      }
      else{ 
        res.json({
            "success":0,
            "message": " Eror  "
         })
      }
}
else{
    res.json({
        "success":0,
        "message": "  please connect with unique Email id  "
     })
} 
 

})


module.exports = router;



