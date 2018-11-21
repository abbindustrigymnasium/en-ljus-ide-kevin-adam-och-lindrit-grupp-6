const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'iot.abbindustrigymnasium.se',
  user     : 'ljuside6',
  password : 'renbullar',
  database : 'ljuside6'
});
 
connection.connect( function(err) {
    if (err) {
        throw err;
    }
    else
    console.log("Sassa massa");
});

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM lamapen', function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: 'Get',
            result:results});
        console.log('The solution is: ', results[0].LampName);
      });
       
   
});

/*router.post('/', (req, res, next) => {
    const product = {
        Name: req.body.Name,
        Price: req.body.Price
    }

    var Createdproduct= function(){
        return new Promise(function(resolve,reject){

            var Theproduct= [product.Name,product.Price];
            console.log(Theproduct);
            connection.query('INSERT INTO products (Name, Price) VALUES ?',[[Theproduct]], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(Theproduct)

                
              });

        })
    } 

Createdproduct().then( Theproduct => {

    res.status(201).json({
        message:"Success, new Price",
        Product: Theproduct
    })
} ).catch(error => {
    res.status(500).json({
        error: error
    })
});


});

router.get('/:productName', (req, res, next) => {
    const Name = req.params.productName;


    var getproduct= function(){
        return new Promise(function(resolve,reject){

            connection.query('SELECT * FROM products WHERE `Name` = ?',[Name], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(results)  
              });

        })
    } 

    getproduct().then( result => {

        if (result.length!==0) {
            res.status(200).json(result);  
        }
        else
        res.status(200).json({
            message: "No such memes"
        });

} ).catch(error => {
    res.status(500).json({
        error: error
    })
});

});

router.patch('/:productName', (req, res, next) => {


    const product = {
        Name: req.body.Name,
        Price: req.body.Price
    }

    var updateproduct= function(){
        return new Promise(function(resolve,reject){

            connection.query('UPDATE `products` SET `Price`= ? WHERE `Name` = ?',[product.Price, product.Name], function (error, results, fields) {
                if (error)
                return reject(error);
                else
                return resolve(results)  
              });
        });
    } 

    updateproduct().then( result => {

       if (result.affectedRows>=1) {
            res.status(200).json(result);
            
        }
        else
        res.status(200).json({
            message: "No such memes to update"
        } );
    }).catch(error => {
            res.status(500).json({
                error: error
            });
        });

});

router.delete('/:productName', (req, res, next) => {


    var destroyproduct= function(){
        return new Promise(function(resolve,reject){
        const Name = req.params.productName;
            connection.query('DELETE FROM products WHERE `Name` = ?',[Name], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(results)  
              });

        })
    } 

    destroyproduct().then( result => {

        if (result.length!==0) {
            res.status(200).json(result);
            
        }
        else
        res.status(404).json({
            message: "No such memes"
        });

} ).catch(error => {
    res.status(500).json({
        error: error
    })
});

});
*/
module.exports = router;
