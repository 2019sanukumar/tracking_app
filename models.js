const mongoose=require('mongoose');


const shipmentSchema=new mongoose.Schema({
    order_id:{
        type:String,
        required:true,
    
    },
    courier_comp:{
        type:String,
        required:true,

    },
    tracker_num:{
        type:String,
        required:true,
    },
    date_of_shipment:{
        type:String,
        required:true
    }

});

const Shipment=new mongoose.model('Shipment',shipmentSchema);
module.exports=Shipment;