# tracking_app


## Installation
install node and npm 
Use the express library  

```bash
npm install express
```

install google translate api
```bash
npm install delivery-tracker
```

make sure your system have mongodb installed.



install monogoose dependecies using

```bash
npm install mongoose
```



## Usage
this is the api which will return the value by taking valid trakcing number and courier company name
```
 courier.trace({trace_no}, function (err, result) {
        if(err)
        {
            console.log('enter valid trace number and courier comany');
            data='enter valid trace number and courier comany';
            return res.end(val);


        }

        console.log(result)
    });

```

Documentation of API used
```
https://www.npmjs.com/package/delivery-tracker

```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

