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
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/submit',function(req,res){
	console.log(req.body.question);
	//var name= req.body.name
	var userDetails={
    _id:      req.body.EmpId,
		Technology: req.body.name,
    question:req.body.question,
		answer:req.body.answer
	}
	var test = cloudant.db.use('test')
 
    // ...and insert a document in it.
    test.insert(userDetails, function(err, body, header) {
      if (err) {
        return console.log('[test.insert] ', err.message);
      }

      console.log('You have inserted the data.');
      console.log(body);
    });
    
	res.write("welcome "+req.body.answer);
	res.end();
})



var server = app.listen(3000, function () {


  console.log("Peter's  app is listening");

})