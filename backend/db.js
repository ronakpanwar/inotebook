const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/inotebook"

const connectToMongo = async () => {
   try {
       mongoose.set('strictQuery', false)
       mongoose.connect(mongoURL) 
       console.log('Mongo connected')
   }
   catch(error) {
       console.log(error)
       process.exit()
   }
   }
/*const connectToMongo = ()=>{
     mongoose.connect(mongoURL,()=>{
        console.log("mongo connect succes fully")
     })
}
*/
module.exports = connectToMongo