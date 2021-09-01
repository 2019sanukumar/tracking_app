const express=require('express');
const app =express();

const port=process.env.port || 8080;// port number on which server will run
app.use(express.json());
const shippo=require('shippo')('shippo_test_71d2f253abcadbcfa608c9a78a782c525a50f1a9');
const request = require('request');
const db=require('./db');
const axios = require('axios').default;

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({extended: true}));//for encoding req 
var tracker = require('delivery-tracker')
const Shipment=require('./models');

app.get('/track-shipment',function(req,res){
    res.render('ship');
})



app.get('/delete/:id',function(req,res)
{
    let id=req.params.id;
    Shipment.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleteing shipement from database',err);
        }
        console.log('succesfullt deleted from database');
        return res.redirect('back');
    })
    // console.log(req.body);

})




app.post('/track-input', async function(req,res)
{
    let result;
    
    let carrier=req.body.Company_code;
    let trace_no=req.body.Tracking_num;
    console.log(carrier,trace_no);
    
        try{

            var options = {
                method: 'POST',
                url: 'https://order-tracking.p.rapidapi.com/trackings/realtime',
                headers: {
                  'content-type': 'application/json',
                  'x-rapidapi-host': 'order-tracking.p.rapidapi.com',
                  'x-rapidapi-key': 'fc36adc14fmsh32cfa3c05903307p137af2jsn19a6de77d96e'
                },
                data: {tracking_number: trace_no, carrier_code: carrier}
            };

            const resp= await axios.request(options);
            console.log(resp.data.data);
            result=resp.data.data.items[0];




        }
        catch(err)
        {
            console.log(err);
        }
    
    
    console.log(result.id);
    // JSON.stringify(result);
    
    console.log(result);
    res.render('view_ship',{
        track:result
    });
    // res.send(result);

});














// var options = {
//   method: 'POST',
//   url: 'https://order-tracking.p.rapidapi.com/trackings/realtime',
//   headers: {
//     'content-type': 'application/json',
//     'x-rapidapi-host': 'order-tracking.p.rapidapi.com',
//     'x-rapidapi-key': 'fc36adc14fmsh32cfa3c05903307p137af2jsn19a6de77d96e'
//   },
//   data: {tracking_number: '1Z74A08E0317341984', carrier_code: 'ups'}
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data.data);
// }).catch(function (error) {
// 	console.error(error);
// });





app.get('/home', function(req, res) {
   return res.render('index');
});

app.post('/take-input',function(req,res){
    console.log(req.body);
    let db_file=new Shipment(req.body);
    db_file.save();
    // res.end(JSON.stringify(req.body));
    // console.log(req.body);
    // console.log(Shipment);
    return res.redirect('/');
    
    
})

app.get('/',function(req,res){
    Shipment.find({},function(err,val)
    {
        if(err){
            console.log('error in fetching data from database',err);
        }
        else{
            return res.render('index',{
                val:val,

            })

        }
    })
   
    
})
//make route to take info from the client side









app.listen(port,()=>{
    console.log("server is running on the port 8080");

});



    