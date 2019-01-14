import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text } from "react-native";
// Här importar jag allt som behövs för att komponenten ska fungera
export default class Component25 extends React.Component {
  constructor(props)
{
  super(props)
  this.state= {
    value: 0.5,
    Warmpr: 1,
    Coldpr: 1,
    Warm: 1024,
    Cold: 1024,
    Bright: 1
     // Här sätter jag alla variabler jag behöver i komponenten
  }
}

  GetDataFromServer =() => {
    //Här säger jag vad den här funktionen heter
    let self= this; 
    fetch('http://iot.abbindustrigymnasium.se:3000/Grupp6/lampa',{
      // Här säger jag vilken ip-adress backenden som jag ska använda här
        method: 'GET'
        // Här säger jag vad jag ska göra med backenden (I det här fallet ta data)
    }).then((Response) => response.json()).then((responseJSON)=>
    {
      console.log(responseJSON);
          self.setState({
            Warmpr: responseJSON.Warmpr,
            Coldpr: responseJSON.Coldpr
            // Här säger jag att variablerna Warmpr och Coldpr ska ändras till värdena Warmpr och Coldpr från databasen
          });
    }).then(this.UpdateDataToServer())
    // Här säger jag att när GetDataFromServer är klart så ska UpdateDataToServer köras
  }

  UpdateDataToServer =() => {
 //Här säger jag vad den här funktionen heter
    const {value, Bright, Warm, Cold, Warmpr, Coldpr} = this.state;
    // Här säger jag vilka varibler som används i den här funktionen
      fetch('http://iot.abbindustrigymnasium.se:3000/Grupp6/lampa/',{
        // Här säger jag vilken ip-adress backenden som jag ska använda här
        method: 'PATCH',
        // Här säger jag att jag ska uppdatera värden till databasen
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: "SLAYER",
          Bright: value,
          Warm: (1024*value*Warmpr),
          Cold: (1024*value*Coldpr)
          // Här säger jag vad alla värden ska vara
            })
      }).then((response) => response.json()).then(responseJSON => {
  
        console.log(responseJSON);
  
      }).catch((error)=>{
        console.log(error);
      });
      
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={value => { this.setState({ value }); this.GetDataFromServer();}}
          // Här säger jag att variblen value ska bli värdet på slidern och att GetDataFromServer ska köras
        />
        <Text>
        Brightness
        </Text>
          {/* Här säger jag vad som ska stå under slidern */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
   // Här skriver jag hur komponenten ska se ut
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});
