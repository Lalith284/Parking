const express = require('express');
const app=express();
const Joi = require('Joi'); 
app.use(express.json());
const slots=[
    {id:1,available:false,carnum:null,entrytime:null},
    {id:2,available:true,carnum:null,entrytime:null},
    {id:3,available:true,carnum:null,entrytime:null},
    {id:4,available:true,carnum:null,entrytime:null},
    {id:5,available:true,carnum:null,entrytime:null},
]


app.get('/parking/available',(req,res)=>{
    var slot=[];
    for (var slotIteration = 0; slotIteration < slots.length; slotIteration++){
        
        if (slots[slotIteration].available === true){
           slot.push(slots[slotIteration].id);
        }
      }

    if(!slot){
        return res.status(404).send('All the slots are booked');
    }
    res.send(slot);
})



app.put('/parking/book/:id',(req,res)=>{
 
    const schema={
        carnum:Joi.required()
    };

    const result = Joi.validate(req.body,schema);
 console.log(result);
    const aSlot = slots.find(s=> s.id === parseInt(req.params.id));
      if(!aSlot || aSlot.available===false){
          return res.status(404).send("Slot not Available or already booked..!");
      }

      if(result.error){
        return res.status(404).send(result.error.message);
    }
      
     aSlot.available=false;
     aSlot.carnum=req.body.carnum;
     aSlot.entrytime= new Date().toTimeString();   
res.send(aSlot);

})



app.put('/parking/deRegister/:carnum',(req,res)=>{
        const aSlot = slots.find(s=> s.carnum == parseInt(req.params.carnum));
        
          if(!aSlot){
              return res.status(404).send("Incorrect Car Number");
          }
         aSlot.available=true;
         aSlot.carnum=null;
         aSlot.entrytime= null;   
    res.send(aSlot);
    
    })

    



app.listen(3000, ()=>{
    console.log("listening on port 3000...")
})


