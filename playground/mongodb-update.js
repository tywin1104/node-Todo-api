const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err) {
  	return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59951d415c19e5313b3056df')
  },{
    $set: {
      done:true
    }
    $inc:{
      age:1
      //increment age by one each time
      //mongodb update operators. doc!
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  });
  db.close();
});