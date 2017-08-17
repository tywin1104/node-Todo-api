// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// ES 6 destructure -> pull mongoClient property from mongodb to a variable
// var obj = new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err) {
  	return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');

//   db.collection('Todos').insertOne({
//     text:'Something to do',
//     completed: false
//   },(err,result)=>{
//   	if(err) {
//   	  return console.log('Unable to insert todo');
//   	}
//   	console.log(JSON.stringify(result.ops,undefined,2));
  // });


//   db.collection('Users').insertOne({
//   	name:'Tianyi',
//   	age:18,
//   	location:'China'
//   },(err,result)=>{
//   	if(err) return console.log(err);
//   	// console.log(JSON.stringify(result.ops),undefined,2);
//   	console.log(result.ops[0]._id.getTimeStamp);
//   });
//   db.close();
// });
