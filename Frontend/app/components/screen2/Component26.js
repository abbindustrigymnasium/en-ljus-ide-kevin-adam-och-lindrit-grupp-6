import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
constructor(props)
{
  super(props)
  this.state= {
    Ledv: 3
  }
}

GetDataFromServer =() => {
  let self= this; 
  fetch('http://192.168.0.118:1337/lampa/AdamTest',{
      method: 'GET'
  }).then((response) => response.json()).then((responseJSON)=>
  {
    console.log(responseJSON);
    self.setState(
      {
          Ledv: responseJSON.LEDSwitch
        });
  console.log(this.state.Ledv);
  }).then(this.UpdateDataToServer())
}



UpdateDataToServer =() => {
  const { Ledv } = this.state;

		fetch('http://192.168.0.118:1337/lampa/',{
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Name: "AdamTest",
				LED: (3-Ledv)
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
            <Text>On/Off</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
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