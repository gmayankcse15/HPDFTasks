var express = require('express');
var path = require('path');
var morgan = require('morgan');
var app = express();
const request = require('request');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());


app.get('/', function(req, res){

res.send("Hello World- Mayank")
 
});

var authors , posts;
app.get('/authors', function(req, res, next){


request('https://jsonplaceholder.typicode.com/users', {json: true}, (err, result, body) => {
	if(err) {return console.log(err);} ;

    authors = body
  
//	console.log(result);
request('https://jsonplaceholder.typicode.com/posts', {json: true}, (err, result, body) => {
if(err) {return console.log(err);} ;

  	posts = body
   	
   	next() 

});



});


}, function(req, res){

	var NoPosts = [] ;
	var Information = '';
 	for(var i = 0 ; i < authors.length; i++)
 	{
 		var auth_name = authors[i].name ;
 		var auth_id = authors[i].id ;

 		NoPosts[i] = 0 ;
 		for(var j = 0 ; j < posts.length ; j++)
 		{
 			if(posts[j].userId == auth_id)
 			{	
 				NoPosts[i] += 1 ;


 			}


 		}

 		Information += auth_name + " has " + NoPosts[i] + "<br />" ;





 	}

 	 		res.send(Information);

});

app.get('/setcookie', function(req, res){

var cookie_name = "Mayank" ;
if(req.cookies.Mayank === undefined)
{
res.cookie(cookie_name, '[{"name":"Mayank Gupta", "age": 20}]').send('Cookie is set');
 }
 else{
 	res.send("Cookies has already been set") ;
 }
});


app.get('/getcookie', function(req, res){

var info = '' ;
var cookie = JSON.parse(req.cookies.Mayank);
console.log(cookie);

console.log("Name :", cookie[0].name);
console.log("Age :", cookie[0].age);
info += "Name :"+cookie[0].name +"<br />" + "Age :" + cookie[0].age ;
res.send(info);
});

app.get('/robot.txt', function(req, res){
res.send("Access Denied");


});

app.get('/html', function(req, res){

  res.sendFile(path.join(__dirname, 'ui', 'index.html'));


});

app.get('/image', function(req, res){

  res.sendFile(path.join(__dirname, 'ui', 'nitscene.jpg'));


});

app.get('/ui/main.js', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/input', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'input.html'));
});


app.post('/inputvalue', function(req, res){

var inputvalue = req.body.Inputvalue ;

console.log(inputvalue);
res.send("Get Value");

});

var port =  80;
app.listen(port, function(req, res){

console.log('App listening on port' + port +'!');

});
