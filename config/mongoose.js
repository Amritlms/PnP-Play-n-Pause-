const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sih2022:sih2022@cluster0.9e5xo.mongodb.net/PnP?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false });

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to db'));

db.once('open',function(){
    console.log('Successully connected to database');
});

module.exports=db;