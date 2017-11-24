//calling the module
var express = require('express');


//cretaing an instance
var app = express();


//calling body-parser and cookie-parser
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');


//calling mongoose module
var mongoose = require('mongoose');




//using body-parser and cookie-parser
app.use(bodyParser.urlencoded({limit : '10mb', extended : 'true'}));
app.use(bodyParser.json({limit : '10mb', extended : 'true'}));


//Defining configuration of mongoDB or at BlogApp it will create Database
var dbPath = "mongodb://localhost/BlogApp";


//Telling mongoDB to connect at dbPath or connect database
db = mongoose.connect(dbPath);


//Checking connection is open or not
mongoose.connection.once('open', function () {
	console.log("connection is established");
})


//Including the schema file or Blog Model file
var Blog = require('./blogModel.js');


//To play with the data which will be store in blog or perform various functions on db using 
//blogData variable
var blogData = mongoose.model('Blog');


//A simple route to check app is working or not correctly
app.get('/', function(req, res){
	res.send("Application in on and it's working very fine. Stay in touch to get latest updates");
});

//Mian routes fro blog Application
//1.) Route to get all the blogs
app.get('/blogs',function(req, res) {
	blogData.find(function(err,result){
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
			res.send(result);
		}
	});
});



//2.) Route to create a Blog
app.post('/blog/create',function(req, res) {
	
	var newBlog = new blogData({
		
		blogHeading 	: req.body.blogHeading,
		blogSubHeading	: req.body.blogSubHeading,
		blogAuthorName 	: req.body.blogAuthorName,
		blogBody		: req.body.blogBody
	});

	var date = Date.now();
	newBlog.blogCreatedOn = date;

	//Saving Blog Data enterd by the blogger
	console.log(newBlog);
	newBlog.save(function(err){
		if(err) {
			console.log(error);
			res.send(err);
		}
		else {
			res.send(newBlog);
		}
	});
});




//3.)Route to get a particular Blog using Blog-ID
app.get('/blog/:id',function(req, res){
	blogData.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log("Some error");
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

app.put('/blog/:id/edit',function(req,res){
	var update = req.body;

	blogData.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
		
		if(err){
			console.log("Some error");
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
 });


app.post('/blog/:id/delete',function(req, res){
	blogData.remove().where({'_id':req.params.id}).exec(function(err, result){
		if(err){
			console.log(error);
			res.send(error);
		}
		else{
			res.send(result);
		}
	});
});



////////////Running app on port 9090 and handling erros////////////////

//When user enter wrong URL/Route
app.get('*',function(req,res,next){
	res.status = 404;
	next("Wrong path you entered");
});



//Checking and sending error if any
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  res.status(404).send('Hey! there...I have not created this page...')
  next(err);
});

app.listen(3000,function(){
	
	console.log("listeing on port 3000......");

});