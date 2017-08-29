const _ = require('lodash');
const{ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var{mongoose} = require('./db/mongoose.js');
var{Todo} = require('./models/todo');
var{User} = require('./models/User');
var{authenticate} = require('./middleware/authenticate');

var app = express();
// const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos})
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)) {
		return res.status(404).send(); 
	}
	Todo.findById(id).then((todo)=>{
		if(!todo) {
			return res.status(404).send();
		}
		res.send(JSON.stringify({todo},undefined,2));
	}).catch((e)=>{
		res.status(400).send();
	});
});

app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then(({todo})=>{
		if(!todo) {
			return res.status(404).send();
		}else {
			res.send(todo);
		}
	}).catch((e)=>{
		res.status(400).send();
	})
});

app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	var body =  _.pick(req.body,['text','completed']); 
	//prevent irregular user input only pick these two properties
	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	if(_.isBoolean(body.completed) &&body.completed){
		body.completedAt = new Date().getTime();
	}else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e)=>{
		res.status(400).send();
	});
});
//POST /users
app.post('/users',(req,res)=>{
	var body = _.pick(req.body,['email','password']);
	var user = new User(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	})
	.then((token)=>{
		res.header('x-auth',token).send(user); 
	})
	.catch((e)=>{
		res.status(400);
		console.log(e);
	})
});

app.get('/users/me',authenticate,(req,res)=>{
	res.send(req.user);
});

// app.get('/users/me',(req,res)=>{
// 	var token = req.header('x-auth');
// 	User.findByToken(token).then((user)=>{
// 		if(!user){
// 			return Promise.reject();
// 		}
// 		res.send(user);
// 	}).catch((e)=>{
// 		res.status(401).send();
// 	});
// });

app.listen(3000,()=>{
	console.log('Started on port 3000'); 
});

module.exports = {app};