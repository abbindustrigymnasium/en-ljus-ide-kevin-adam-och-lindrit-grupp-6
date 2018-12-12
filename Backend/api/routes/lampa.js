const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'iot.abbindustrigymnasium.se',
  user     : 'ljuside6',
  password : 'renbullar',
  database : 'ljuside6'
});
// Vi skapar en variabel som inehåller allt som behövs för att ansluta till våra databas
 
connection.connect( function(err) {
    if (err) {
        throw err;
    } else
    console.log("Sassa Massa");
});
// Vi testar om vi kan koppla upp med väran variabel. Om det går kommer den skriva ut Sassa Massa

var Values_fromDB; //Vi skapae en global variabel, vilket gör att den kan användas överallt inom lampa.js eftersom att den är inte bunden till någon funktion.
var cron = require('node-cron');
cron.schedule('* * * * * *', () => {

    //Vi använder node-cron för att ständigt hålla våras värden uppdaterade.
    //6 stjärnor innebär att den utför arbetet varje sekund
    //Detta är så att så fort lampan eller appen vill ha värden så har backenden redan värden.
    //Det innebär att den inte behöver hämta nya värden från databasen varje gång man vill något.

    var GetLight = function () {                            
        return new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM lamapen", function (err,result) { 
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            }); //Vi skapar variabeln GetLight och gör den till en funktion som hämtar värden från databasen
            //SQL kod används delvis eftersom att det är det språk som databasen förstår.
        });
    }
    GetLight().then(response => {
        Values_fromDB= response;
        //Sedan lägger vi över värdena som hämtades till en variabel kallad Values_fromDB
    })
}, null, true, 'America/Los_Angeles');


router.get('', (req, res) => {
    res.status(200).json(Values_fromDB);
        console.log(Values_fromDB);
    });

router.get('/:lampName', (req, res) => {
    //Detta är get funktionen som används av lampan. Om avsändaren har med ett "lampName" i sin GET-request så kommer denna get att köras
    //Dess syfte är att hämta ut värden för en specifik Lampa i databasen
    var found=false;
    var OutputValue;
    Values_fromDB.forEach(element => {
        if (element.LampName== req.params.lampName) {
            found=true;
            OutputValue =element;
            //Om lampName stämmer överens med ett LampName i Values_fromDB (se ovan) så kommer den hämta det värdet. 
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


router.patch('/:LampName', (req, res, next) => {
    //Patch används för att ändra värden i databasen, vilket vi använder för att ändra ljusstyrkan

    const Lamp = {
        Name: req.body.Name,
        Warm: req.body.Warm,
        Cold: req.body.Cold,
        LED: req.body.LED,
        Bright: req.body.Bright,
        Warmpr: req.body.Warmpr,
        Coldpr: req.body.Coldpr
    }
    //vi skapar variabeln lamp som innehåller alla värden som skickats i bodyn till databasen.
    let query= "UPDATE `lamapen` SET ";
    let data=[];
    if (Lamp.Warm!=null) {
        query+= "`LampStrengthWarm`= ?, ";
        data.push(Lamp.Warm,);
    }
    if (Lamp.Cold!=null) {
        query+= "`LampStrengthCold`= ?, ";
        data.push(Lamp.Cold,);
    }
    if (Lamp.LED!=null) {
        query+= "`LEDSwitch`= ?, ";
        data.push(Lamp.LED,);
    }
    if (Lamp.Bright!=null) {
        query+= "`Bright`= ?, ";
        data.push(Lamp.Bright,);
    }
    if (Lamp.Warmpr!=null) {
        query+= "`Warmpr`= ?, ";
        data.push(Lamp.Warmpr,);
    }
    if (Lamp.Coldpr!=null) {
        query+= "`Coldpr`= ?, ";
        data.push(Lamp.Coldpr,);
    }
    query = query.slice(0, -2);
    query+= " WHERE `LampName` = ?";
    data.push(Lamp.Name)
    var updateproduct= function(){
        return new Promise(function(resolve,reject){

            connection.query(query,data, function (error, results, fields) {
                if (error)
                return reject(error);
                else
                return resolve(results)  
              });
        });
    } 
    //updateproduct 

    updateproduct().then( result => {
        //kom ihåg att det är först här som funktionen körs. Innan detta skapade vi bara funktionen, men vi körde den inte.

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
        Name: req.body.Name,
        Warm: req.body.Warm,
        Cold: req.body.Cold,
        LED: req.body.LED
    }

    var CreatedLamp= function(){
        return new Promise(function(resolve,reject){

            var LampValues = [Lamp.Name, Lamp.Warm, Lamp.Cold, Lamp.LED]

            connection.query('INSERT INTO `lamapen` (`LampName`, `LampStrengthWarm`, `LampStrengthCold`, `LEDSwitch`) VALUES ?',[[LampValues]], function (error, results, fields) {
                if (error)
                return reject(error);
                else
                return resolve(results)  
              });
        });
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


router.delete('/:LampName', (req, res, next) => {

    var DeleteLamp= function(){
        return new Promise(function(resolve,reject){

            connection.query('DELETE FROM lamapen WHERE `LampName` = ?',[req.params.LampName], function (error, results, fields) {
                if (error)
                return reject(error);
                else
                return resolve(results)  
              });
        });
    } 
    //Vi använder oss av lampName som skickas med för att ta bort värden från databasen

    DeleteLamp().then( result => {

       if (result.affectedRows>=1) {
            res.status(200).json(result);
            
        }
        else
        res.status(200).json({
            message: "You better not delete the SLAYER lamp,"
        } );
    }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;