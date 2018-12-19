import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Här importar jag allt som behövs för att komponenten ska fungera


export default class App extends React.Component {
constructor(props)
{
  super(props)
  this.state= {
    Ledv: 3
     // Här säger jag att jag kommer använda variablen Ledv och att den ska vara 3
  }
}

GetDataFromServer =() => {
  //Här säger jag vad den här funktionen heter
  let self= this; 
  fetch('http://192.168.0.118:1337/lampa/AdamTest',{
    // Här säger jag vilken ip-adress backenden som jag ska använda här
      method: 'GET'
      // Här säger jag vad jag ska göra med backenden (I det här fallet ta data)
  }).then((response) => response.json()).then((responseJSON)=>
  {
    console.log(responseJSON);
    self.setState(
      {
          Ledv: responseJSON.LEDSwitch
           // Här säger jag att variablen Ledv ska ändras till värdet LEDSwitch från databasen
        });
  console.log(this.state.Ledv);
  }).then(this.UpdateDataToServer())
  // Här säger jag att när GetDataFromServer är klart så ska UpdateDataToServer köras
}



UpdateDataToServer =() => {
   //Här säger jag vad den här funktionen heter
  const { Ledv } = this.state;
  // Här säger jag att Ledv ska användas i funktionen

		fetch('http://192.168.0.118:1337/lampa/',{
      // Här säger jag vilken ip-adress backenden som jag ska använda här
      method: 'PATCH',
      // Här säger jag att jag ska uppdatera värden till databasen
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Name: "SLAYER",
        LED: (3-Ledv)
        // Här säger jag vad alla värden ska vara
			    })
		}).then((response) => response.json()).then(responseJSON => {

			console.log(responseJSON);

		}).catch((error)=>{
			console.log(error);
		});
		
}


    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={()=> this.GetDataFromServer()}>
          {/* Här säger jag att GetDataFromServer ska köras när man trycker på knackpen */}
            <Text>On/Off</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    // Här säger jag hur appen ska se ut
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#859a9b',
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    },
  });