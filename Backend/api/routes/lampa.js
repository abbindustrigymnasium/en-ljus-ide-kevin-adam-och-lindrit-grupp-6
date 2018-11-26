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
        console.log(results[0].LampName);
      });
       
   
});

router.get('/:lampName', (req, res, next) => {
    const Name = req.params.lampName;


    var getproduct= function(){
        return new Promise(function(resolve,reject){

            connection.query('SELECT * FROM lamapen WHERE `LampName` = ?',[Name], function (error, results) {
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
            message: "No such Lamap"
        });

} ).catch(error => {
    res.status(500).json({
        error: error
    })
});

});


router.patch('/:LampName', (req, res, next) => {

    const Lamp = {
        Name: req.body.Name,
        Warm: req.body.Warm,
        Cold: req.body.Cold,
        LED: req.body.LED
    }

    var updateproduct= function(){
        return new Promise(function(resolve,reject){

            connection.query('UPDATE `lamapen` SET `LampStrengthWarm`= ?, `LampStrengthCold`= ?, `LEDSwitch`= ? WHERE `LampName` = ?',[Lamp.Warm, Lamp.Cold, Lamp.LED, Lamp.Name], function (error, results, fields) {
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
            message: "No such lamaps to update"
        } );
    }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
});


router.post('', (req, res, next) => {
    const Lamp = {
        LampName: req.body.Name,
        LightStrengthWarm: req.body.Warm,
        LightStrengthCold: req.body.Cold,
        LEDSwitch: req.body.LED
    }


    var CreatedLamp= function(){
        return new Promise(function(resolve,reject){

            var LampValues= [Lamp.LampName, Lamp.LightStrengthWarm, Lamp.LightStrengthCold, Lamp.LEDSwitch];

            con.query('INSERT INTO lamapen (LampName, LampStrengthWarm, LampStrengthCold, LEDSwitch) VALUES ?',[[LampValues]], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(LampValues)         
              });
        })
    }

CreatedLamp().then( NewLamp => {
    res.status(201).json({
        message:"Success, new lamap",
        result: NewLamp
    })
} ).catch(error => {
    res.status(500).json({
        error: error
    })
});
});




module.exports = router;