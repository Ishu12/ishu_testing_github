var Cloudant = require('cloudant');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var me = "857b6049-c234-4868-9a56-a51d617435e5-bluemix"; // Set this to your own account
var password = "78a84c4521691cb2220ba34e4b66059060851012291abad83daba07971f71d2e";

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});
app.use(express.static('public'));
console.log("Test passed 1 ");
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
console.log("Test passed 2");
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
console.log("Test passed 3 ");
app.post('/Submit',function(req,res){
	console.log("Test passed 4");
var _id = req.body.EmpId;
console.log("Test passed 5");


var test = cloudant.db.use("test")

test.get(_id,  function(err, body) {
  if (!err)

    console.log(body);
});

// test.list(function(err, body) {
//   if (!err) {
//     body.rows.forEach(function(doc) {
//       console.log(doc);
//     });
//   }
// });
    res.end();
})
var server = app.listen(8000, function () {


  console.log("Peter's  app is listening");

})