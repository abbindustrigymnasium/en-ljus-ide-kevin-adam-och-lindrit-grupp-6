const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : "localhost",
  user     : "lmao",
  password : "4321",
  database : "light"
});

con.connect( function(err) {
    if (err) throw err;
});

var Values_fromDB;
var cron = require('node-cron');
cron.schedule('* * * * * *', () => {

    var GetLight = function () {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM switch", function (err,result) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });
        });
    }
    GetLight().then(response => {
        Values_fromDB= response;
        //console.log(Values_fromDB);
    })
}, null, true, 'America/Los_Angeles');


router.get('', (req, res) => {
    res.status(200).json(Values_fromDB);
        console.log(Values_fromDB);
    });

router.get('/:lampName', (req, res) => {
    var found=false;
    var OutputValue;
    Values_fromDB.forEach(element => {
        if (element.Name== req.params.lampName) {
            found=true;
            OutputValue =element;
        }
    });
    if (found!= true) {
        res.status(200).json({name: "none",
    message: "ne de finns inga lampor"});
    }
    else
    {
        res.status(200).json(OutputValue);
        console.log(OutputValue);
    }
});


router.post('', (req, res, next) => {
    const lamp = {
        Name: req.body.Name,
        Hard: req.body.Hard,
        Strength: req.body.Strength
    }

    var CreatedLamp= function(){
        return new Promise(function(resolve,reject){

            var NewLamp= [lamp.Name,lamp.Hard,lamp.Strength];
            console.log(NewLamp);
            con.query('INSERT INTO switch (Name, Hard, Strength) VALUES ?',[[NewLamp]], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(NewLamp)         
              });
        })
    }

CreatedLamp().then( NewLamp => {
    res.status(201).json({
        message:"Success, new lamp",
        NewLamp: NewLamp
    })
} ).catch(error => {
    res.status(500).json({
        error: error
    })
});
});


router.patch('/:lampName', (req, res, next) => {
    const lamp = {
        Hard: req.body.Hard,
        Strength: req.body.Strength
    }

    var updateLamp= function(){
        return new Promise(function(resolve,reject){

            con.query('UPDATE `switch` SET `Hard`= ?, `Strength`= ? WHERE `Name` = ?',[lamp.Hard, lamp.Strength, req.params.lampName], function (error, results, fields) {
                if (error)
                return reject(error);
                else
                return resolve(results)  
              });
        });
    } 

    updateLamp().then( result => {

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


module.exports = router;
