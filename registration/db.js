var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'deepika1234',
  database : 'node'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn"+err);    
}
});


app.post("/post",function(req,res)
{
// read here all fields mentioned in the database
var userid=req.body.userid;
var password=req.body.password;
var name=req.body.name;
var address=req.body.address;
var country=req.body.country;
var zipcode=req.body.zipcode;
var phone_number=req.body.zipcode;
var email=req.body.email;
var sex=req.body.sex;
var language=req.body.language;
var about=req.body.about;
var values=[userid,password,name,address,country,zipcode,phone_number,email,sex,language,about];
connection.query('insert into users values (?,?,?,?,?,?,?,?,?,?,?)',values, function(err, rows, fields) {
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

app.listen(8000);