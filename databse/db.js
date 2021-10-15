require('dotenv').config()
const mongoose = require('mongoose');
// const dbName=process.env.DB_NAME ; 
mongoose.connect(`mongodb+srv://skntmax:sknt987@cluster0.q9uaj.mongodb.net/demo2?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
     console.log("db connected ")
});

const user = new mongoose.model("user", {
   firstname: {
        type: String,
        required: true
    }, 
    lastname:{
        type: String,
        required: true         
    } , 
    username:{
        type: String,
        required: true         
    } , 
    email: {
        type: String,
        required: true
    }, 
     password: {
         type: String,
         required: true
     },
     
 });


const connection = mongoose.model('connection' , {
    firstname: {
        type: String,
        required: true
    }, 
    lastname:{
        type: String,
        required: true         
    } , 
    email: {
        type: String,
        required: true
    }, 
     course: {
         type: String,
         required: true
     },
     coursType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },


}) 

if ( user && connection ) {
    console.log("user and connection model created");
} else
    console.log("There is something error  "); 

module.exports = {user , connection }




