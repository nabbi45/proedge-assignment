const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
  const query = req.body.rollNumber;
  url = "http://proedge.me/test.php?rollnumber="+query;
  http.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
    const newData =  data.toString('utf-8');

      console.log(newData);
      res.write(newData);
      res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("Server has started on port 3000");
})
