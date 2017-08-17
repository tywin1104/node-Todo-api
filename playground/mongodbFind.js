const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err) {
  	return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');
  db.collection('Todos').find({
  	_id:new ObjectID("59951d9b5c19e5313b305715")
  }).toArray().then((docs)=>{
  	console.log('Todos');
  	console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('Unable to fetch todos',err);
  });

  // db.close();

});