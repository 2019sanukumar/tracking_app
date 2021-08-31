const express=require('express');
const app =express();
// const port=8080;
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

app.get('/track',function(req,res){
    res.render('ship');
})
// app.post('/track-input', function(req,res)//added async await functon in api
// {
//     //take input from user about code  and trace Number
//     console.log(req.body);
//     let code=req.body.Company_code;
//     let trace_no=req.body.Tracking_num;
//     console.log(code);
//     var courier = tracker.courier(tracker.COURIER.KOREAPOST.CODE)
//     var data;
//     courier.trace({trace_no}, function (err, result) {
//         if(err)
//         {
//             console.log('enter valid trace number and courier comany',err);
//             data='enter valid trace number and courier comany';
//             return res.end(data);


//         }
//         data=result;
//         console.log(result)
//     });
//     //data will contain variour tracking detail about shipemt
//     res.render('ship',{
//         track_val:data,

//     });

// });

// app.post('/track-input',async function(req,res)
// {
//     console.log(req.body);
//     let carrier_code=req.body.Company_code;
//     let trace_no=req.body.Tracking_num;
//     let rt;
//     // console.log(code);
//     var options = {
//         method: 'POST',
//         uri: 'https://api.shipengine.com/v1/tracking?carrier_code='+carrier_code+'&tracking_number='+trace_no,
//         headers: {
//           Host: 'api.shipengine.com',
//           'API-Key': 'TEST_3kzY06cAllPz1pnenHO3zsU82hXiCR2Xm/K84e0A7oE'
//         }
//         // json:true
//       };
//       try{
//           let res1=await request(options);
//           if(err)
//           {
//               console.log(err,"error in api");
//           }
//           console.log(res1.body);
//           rt=res1.body
//       }
//       catch(err)
//       {
//           console.log(err);
//       }
      

    
//       console.log(rt,'rt');
//       res.send('sanu');

// })


app.get('/delete/:id',function(req,res)
{
    let id=req.params.id;
    // Shipment.find({},function(err,val)
    // {
    //     if(err){
    //         console.log('error in fetching data from database',err);
    //     }
    //     else{
    //         return res.render('index',{
    //             val:val,

    //         })

    //     }
    // })
    
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
    
    
    console.log(result);
    // JSON.stringify(result);
    console.log(result);
    // res.render('ship',{
    //     track:JSON.parse(result)
    // });
    res.send(result);

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



    