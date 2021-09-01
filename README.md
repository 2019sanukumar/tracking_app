# tracking_app


## Installation
install node and npm 
Use the express library  

```bash
npm install express
```

used below api
```bash
https://rapidapi.com/colinnn/api/order-tracking/
```

install ejs view engine 
```
npm install ejs
```

install nodemon
```
npm install nodemon
```

make sure your system have mongodb installed.



install monogoose dependecies using

```bash
npm install mongoose
```

##various router are as follows:

1.For showin detail about product:
```
https://localhost:8080/
```
2.adding detail about product:

```
https://localhost:8080/take-input
```

3.Taking detail for tracking shipment:

```
https://localhost:8080/track
```

4.Showing detaila after fetching detail from api :

```
https://localhost:8080/track-input
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

