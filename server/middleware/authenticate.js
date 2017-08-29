// var {User} = require('./../models/user');
//Do not use require !! use mongoose.model(...)
const mongoose = require('mongoose');
var User = mongoose.model('User')
var authenticate = (req,res,next)=>{
	var token = req.header('x-auth');
	User.findByToken(token).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next();
	}).catch((e)=>{
		res.status(401).send();
	});
}
module.exports = {authenticate};