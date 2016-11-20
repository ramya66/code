var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var fs=require('fs');
 var app = express();
var jade=require('jade')
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
app.set('temp','./temp')
app.set('view engine','login.jade');
app.all('/*.html', function (req, res) {
       console.log(req.url);
       var out = fs.readFileSync("temp" + req.url);
       res.set('content-type', 'text/html');
       res.send(out);
   });


/*app.get("/user/:userid",function(req,res)
{
 
    var userid = req.param('userid');
   var values=[userid];
    console.log(req.param('userid')); 
     connection.query('select * from register where userid=?',values,function(err, rows, fields) {
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

app.post("/register",function(req,res)
{
var userid=req.body.userid;
var password=req.body.password;
var name=req.body.name;
var address=req.body.address;
var country=req.body.country;
var zipcode=req.body.zipcode;
var email=req.body.email;
var sex=req.body.sex;
var language=req.body.language;
var about=req.body.about;
var values=[userid,password,name,address,country,zipcode,email,sex,language,about];
connection.query('insert into register values (?,?,?,?,?,?,?,?,?,?)',values, function(err, rows, fields) {
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
});*/


app.post("/login",function(req,res)
{
var username=req.body.username;
var password=req.body.password;
var values=[username,password];
connection.query('select * from login where username=? and password=?',values,function(err, rows, fields) {
if (!err)
    {
      console.log('The solution is: ', rows);
      
  
              if(rows.length==1)
               {
                
                 
                     res.redirect('login.jade');
                  
                   
               }
                    else{
                      console.log('error');
                     res.write('you are not a valid user');
                     }
  
}

  else{
    console.log('error while performing query.'+err);
     res.write("error");
  }
  res.end();
  });
});
app.get("/login",function(req,res){
  
  res.render("/login.jade")
  
});

app.get('/',function(req,res){
  res.render(".temp/login");
});




/*app.put("/user/:userid",function(req,res)
{
var address=req.param('address');
var name=req.param('name');
var userid=req.param('userid');
var values=[address,name,userid];
console.log(req.param('name'));
connection.query('update register set name=?,address=? where userid=?',values, function(err, rows, fields) {
    if (!err){
    console.log('The solution is: ' ,rows);
    res.write(JSON.stringify(rows));
  }
  else{
    console.log('Error while performing Query.'+err);
     res.write("error!");
  }
  res.end();
  });
});


app.delete("/user/:userid",function(req,res)
{

var userid=req.param('userid');
var values=[userid];
console.log(req.param('userid'));
connection.query('delete from register where userid=?',values, function(err, rows, fields) {
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
});*/

app.listen(3000);
