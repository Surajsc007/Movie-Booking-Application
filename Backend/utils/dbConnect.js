const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const Connection=()=>{
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('DB CONNECTED!'))
.catch(err => console.log(err));
}
module.exports=Connection;


