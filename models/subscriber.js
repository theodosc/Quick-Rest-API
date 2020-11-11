const mongoose=require('mongoose');

const subscribersSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    subscribedToChannel:{
        type:String,
      required:true
    },
    subscribeDate:{
        type:Date,
      required:true,
      default:Date.now
    }
})
//1st param is the name of the model in our database,2ond is the schema created
module.exports=mongoose.model('Subscriber',subscribersSchema)