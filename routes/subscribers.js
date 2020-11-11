const express=require('express');
const router=express.Router();
const Subscriber=require('../models/subscriber');

module.exports=router;

//Getting all subs
router.get('/',async (req,res)=>{
   try{
   const subscribers= await Subscriber.find() //we need to await this method because this is not async,as it is done code proceeds
    res.json(subscribers)  
}catch(err){
    res.status(500).json({message:err.message}) //500 error on server
   }
})
//Getting One sub
router.get('/:id',getSubscriber,(req,res)=>{
   res.json(res.subscriber);
})
//Create one sub
router.post('/',async(req,res)=>{
   //we create a JS object, req.body is w/e the user sends to us (in our case JSON)
   const subscriber=new Subscriber({
      name:req.body.name,
      subscribedToChannel:
      req.body.subscribedToChannel
   })
   try{
      const newSubscriber=await subscriber.save() //we insert,save our new subscriber
      res.status(201).json(newSubscriber) //201 successfully created a new sub
   }catch(err){
      res.status(400).json({message:err.message}) //user gives bad date
   }

})
//Update a sub
router.patch('/:id',getSubscriber,async (req,res)=>{ //Not put because we want to update only the info subscriber wants to update
   if(req.body.name !=null){
      res.subscriber.name=req.body.name;
   }
   if(req.body.subscribedToChannel !=null){
      res.subscriber.subscribedToChannel=req.body.subscribedToChannel;
   }
   try{
      const updatedSubscriber=await res.subscriber.save()
      res.json(updatedSubscriber);
   }catch(err){
      res.status(400).json({message:err.message})
   }
})
//Delete a sub
router.delete('/:id',getSubscriber,async(req,res)=>{
   try{
      await res.subscriber.remove();
      res.json({message:'Deleted Subscriber'})
   }catch(err){
      res.status(500).json({message:err.message});
   }
   
})


//create middleware that we will use in patch,delete,get a single sub

 async function getSubscriber(req,res,next){
    let subscriber;
      try{
         subscriber=await Subscriber.findById(req.params.id)
         if(subscriber==null){
            return res.status(404).json({message:'Cannot find subscriber'});
         }
      }catch(err){
         return res.status(500).json({message:err.message})
      }
      res.subscriber=subscriber;//we can now use res.subscriber into patch or delete
      next();// this will allow us to move to next piece of middleware or software
}