//Calling the module
var mongoose = require('mongoose');

//using the schema part of the module
var blogSchema = mongoose.Schema;

//creating an instance
var blogData = new blogSchema({

	blogId									:  {type : String, default : ''},
	blogCreatedOn							:  {type : Date, default : null},
	blogHeading								:  {type : String, default : ''},
	blogSubHeading							:  {type : String, default : ''},
	blogBody								:  {type : String, default : ''},
	imageUrl								:  {type : String, default : 'https://www.google.com'},
	blogAuthorName							:  {type : String, default : ''}

});

//blogData is schema name
module.exports = mongoose.model('Blog', blogData);
