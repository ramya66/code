
var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var bookRouter = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection = mysql.createConnection
({
 host     : 'localhost',
 user     : 'root',
 password : 'pandu@123',
 database : 'node'
});


connection.connect(function(err){
if(!err) {
   console.log("Database is connected ... nn");    
} else {
   console.log("Error connecting database ... nn"+err);    
}
});

app.get("/",function(req,res)
{
   // (for get method)
    var username = req.param('name');
    var X = req.param('emailid')
   var values=[username,X];
   console.log(req.param('username'));
connection.query('select * from users',values, function(err, rows, fields) {
 if (!err){
   console.log('The solution is: ', rows);
   res.write(JSON.stringify(rows));
 }
 else{
   console.log('Error while performing Query.'+err);
    res.write("error!");
 }
 res.end();
 });

});



app.post("/post",function(req,res)
{
// read here all fields mentioned in the database
var name=req.body.name;
var emailid=req.body.emailid;
var password=req.body.password;
var address=req.body.address;
var values=[name,emailid,password,address];
connection.query('insert into users values (?,?,?,?)',values, function(err, rows, fields) {

   if (!err){
   console.log('The solution is: ', rows);
   res.write(JSON.stringify(rows));
 }
 else{
   console.log('Error while performing Query.'+err);
    res.write("error!");
 }
 res.end();
 });

});

app.put("/update/:userid", function(req,res){
  var name = req.param('name');
  var userid=req.param('userid');
  var values = [name,userid];
  connection.query('update users set name=? where userid=?',values,  function(err,rows,fields){
    if (!err){
      console.log('the solution is:', rows);
      res.write(JSON.stringify(rows));
    }
    else{
       console.log("error while performing query." + err);
       res.write("error!");
    }
    res.end();
  });
});

app.delete("/delete/:userid", function(req,res){
  var userid = req.param('userid');
  var values =[userid];
  connection.query('delete from users where userid=?',values, function(err,rows,fields){
    if(!err){
      console.log('the solution is:', rows);
      res.write(JSON.stringify(rows));
    }
    else{
      console.log("error while performong query." + err);
      res.write("error!");
    }
    res.end();
  });
});



app.listen(3306);