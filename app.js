var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')

app.use(bodyParser.json()); 											// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 					// for parsing application/x-www-form-urlencoded
app.use(expressJWT({secret: 'mysecret'}).unless({path: ['/login']}))	// Protect all routes excluding /login

// Restricted route (by default)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Authorization fake endpoint (remember, we're tinkering with JWT)
app.post('/login', function (req, res){

	var user = req.body

	if (user.username == 'marcos' && user.password == 'pollas'){
		
		// Create payload
		var payload = {
		  "sub": "1234567890",
		  "name": "Marcos Rgz",
		  "admin": true
		}

		// Create token containing the payload
		var token = jwt.sign(payload, 'mysecret');

		res.send(token)

	} else {

		// Ooops! Username or password are wrong!
		res.sendStatus(401)
	}

});

app.listen(3000, function () {
  console.log('JWT Test 0.1 - Marcos Rgz.');
});

