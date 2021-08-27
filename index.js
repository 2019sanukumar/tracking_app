const express=require('express');
const app =express();
const port=8080;

const Easypost = require('@easypost/api');
const api = new Easypost('EZTK443ea52d407243a6aa841460fd4cb84cE20GNuyezSpvaaCfebR7vQ');
app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({extended: true}));//for encoding req 

// use res.render to load up an ejs view file

// index page
app.get('/home', function(req, res) {
   return res.render('index');
});

app.post('/take-input',function(req,res){
    console.log(req.body);
    res.end(JSON.stringify(req.body));
})

app.get('/',function(req,res){
    // console.log('at home router');

    // api.Tracker.all({
    //     page_size: 2,
    //     start_datetime: '2016-01-02T08:50:00Z'
    //   }).then(console.log);
    res.send('index');
})
//make route to take info from the client side









app.listen(port,()=>{
    console.log("server is running on the port 8080");

});



    