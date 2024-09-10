const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kjsfvhfsbvhsbakjbcaidsbc';
const app = express();
let users =[];

app.use(express.json())

app.get('/',function(req,res){
    res.sendFile("/Users/priyanshudeswal/Desktop/projects/todo_backend/public/index.html");
})

app.post('/signup',function(req,res){
    const username = req.body.username
    const password = req.body.password;
    users.push({
        username : username,
        password: password

    })
    res.json({
        message : 'account created successfully'
    })

})

function auth(req,res,next){
    const token = req.headers.token;
    const decInfo = jwt.verify(token,JWT_SECRET);
    if(decInfo){
        req.username = decInfo.username;
        next()
    }
    else{
        res.status(404);
    }
}




app.post('/signin',function(req,res){
    const username = req.body.username
    const password = req.body.password;
    let founduser = null;
    for(let i =0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            founduser = users[i];
            const jwttoken = jwt.sign({
                username : founduser.username
            },JWT_SECRET)
            return res.json({
                token : jwttoken
            })
            
        }
    }
    

})

app.get('/me',auth,function(req,res){
    let foundUser = null;
    for(let i=0;i<users.length;i++){
        if(users[i].username == req.username){
            foundUser = users[i];
        }


    }
    res.json({
        username : foundUser.username,
        password : foundUser.password
    })
    
})
app.listen(3000);