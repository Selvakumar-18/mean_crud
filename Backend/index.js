const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const IssueModel = require('./model/issue.model')

const port = 3000
require("dotenv").config();

const app = express()

mongoose.connect("mongodb://localhost:27017/issues",{useUnifiedTopology:true}).then(() => {
    console.log('db onnected')
})
.catch((e) => {
    console.log(e.message)
})

app.use(cors())
app.use(express.json())


app.post('/postissue',async(req,res)=>
{  
    try
    {
        let issueObj = new IssueModel(req.body)
        let responseObj = await issueObj.save()
        console.log("post working fine......")
        res.send(responseObj)       
    }
    catch(e)
    {
        console.log(e)
        // console.log("post__error")
    }

})

app.get('/postissue',async(req,res)=>
{
    try
    {
        const response = await IssueModel.find()
        res.json(response);
        console.log(response);
    }
    catch(e)
    {
        console.log("get error....")
    }
})

app.delete('/postissue/:id',async(req,res)=>
{
    try
    {
        const data = await IssueModel.deleteOne({_id:req.params.id})
        console.log("I think delete is working fine.-.")
        res.send(data)
    }
    catch(e)
    {
        console.log("delete is not working......")
    }
    
})


app.put('/postissue/:id',async(req,res)=>
{
    try
    {
       const print = await IssueModel.updateOne({_id:req.params.id},{$set:req.body})
       console.log("post working")
       res.send(print)
    }
    catch(e)
    {
        console.log("post is not working......")
    }
    
})


app.listen(port,()=>{
    console.log(`Server is working in this port ${port}`)
})



