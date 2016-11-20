var mysql =require('mysql');
var connection =mysql.createConnection({
host: 'localhost',
user:'root',
password:'pandu@123',
database:'node'
});
connection.connect();
connection.query ('select * from users',function(err, rows,fields){
if(! err)
  console.log('the solution is: ', rows);
else
  console.log('error while performing query');
});
connection.end();
