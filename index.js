const express=require('express');
const app =express();
const port=8080;

const db=require('./db');

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({extended: true}));//for encoding req 
var tracker = require('delivery-tracker')
const Shipment=require('./models');

app.get('/track',function(req,res){
    res.render('ship');
})
app.post('/track-input',function(req,res)
{
    //take input from user about code  and trace Number
    console.log(req.body);
    let code=req.body.Company_code;
    let trace_no=req.body.Tracking_num;
    var courier = tracker.courier(tracker.COURIER.KOREAPOST.code)
    var data;
    courier.trace({trace_no}, function (err, result) {
        if(err)
        {
            console.log('enter valid trace number and courier comany');
            data='enter valid trace number and courier comany';
            return res.end(val);


        }

        console.log(result)
    });
    res.render('ship',{
        track_val:req.body
    });

})


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



    