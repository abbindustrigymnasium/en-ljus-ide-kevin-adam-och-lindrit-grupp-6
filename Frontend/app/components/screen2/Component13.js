import React from "react";
import Slider from "react-native-slider";
import { 
   StyleSheet, 
   View, 
   Text, 
} from "react-native";
// Här importar jag allt som behövs för att komponenten ska fungera


export default class Component13 extends React.Component {
  constructor(props)
  {
    super(props)
    this.state= {
      value: 0.5,
      Bright: 1,
      Warm: 1024,
      Cold: 1024,
      Warmpr: 0,
      Coldpr: 0
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
            Bright: responseJSON.Bright
            // Här säger jag att variablen Bright ska ändras till värdet Bright från databasen
          });
    }).then(this.UpdateDataToServer())
    // Här säger jag att när GetDataFromServer är klart så ska UpdateDataToServer köras
  }
  
  UpdateDataToServer =() => {
    //Här säger jag vad den här funktionen heter
    const {value, Bright, Warm, Cold, Warmpr, Coldpr} = this.state;
    // Här säger jag vilka varibler som används i den här funktionen
    if (value > 0.5) {
      this.setState({ Warmpr: 1 });
      console.log(Warmpr)
    }
    else {
      this.setState({ Warmpr: value*2 });
      console.log(Warmpr)
      // Här säger jag att om value är större än 0,5 så ska Warmpr bli 1 och om det inte är det ska Warmpr bli value*2
    }
    if (1-value > 0.5){
      this.setState({ Coldpr: 1 });
    }
    else {
      this.setState({ Coldpr: (1-value)*2 });
      // Här säger jag att om 1-value är större än 0,5 så ska Coldpr bli 1 och om det inte är det ska Coldpr bli (1-value)*2
    }
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
          Warmpr: Warmpr,
          Coldpr: Coldpr,
          Warm: (1024*Bright*value),
          Cold: (1024*Bright*(1-value))
          // Här säger jag vad alla värden ska vara
            })
      }).then((response) => response.json()).then(responseJSON => {
  S
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
          Colour
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

