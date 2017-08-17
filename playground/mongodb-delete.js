const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err) {
  	return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');

  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
  // 	console.log(result); 
  // });

  // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
  // 	console.log(result);
  // });

  db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  	console.log(result);
  });

  db.collection('Users').deleteMany({name:'Tianyi'});

  db.collection('Users').findOneAndDelete({id:new ObjectID('59951d415c19e5313b3056df')})
  	.then((result)=>{
  		console.log(result);
  	});
  db.close();
});